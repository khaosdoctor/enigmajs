// Code heavily inspired on Professor's Mike Pound's (@mikepound) Enigma Machine: https://github.com/mikepound/enigma/blob/07b8469d29850499df105f3077df32a638c68cc4/src/com/mikepound/enigma/Rotor.java
import {toAlphabetIndex, normalizeToAlphabetBounds} from '../util'

enum RotorWirings {
  I = "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  II = "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  III = "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  IV = "ESOVPZJAYQUIRHXLNFTGKDCMWB",
  V = "VZBRGITYUPSDNHLXAWMJQOFECK",
}

enum RotorDirection {
  INPUT,
  OUTPUT
}

export enum RotorPositions {
  LEFT = "LEFT",
  MIDDLE = "MIDDLE",
  RIGHT = "RIGHT"
}

export enum Rotors {
  I = "I",
  II = "II",
  III = "III",
  IV = "IV",
  V = "V",
}

const rotorConfigurations = {
  I: {
    notch: {
      position: 16,
      letter: "Q",
    },
    wiring: RotorWirings.I,
  },
  II: {
    notch: {
      position: 4,
      letter: "E",
    },
    wiring: RotorWirings.II
  },
  III: {
    notch: {
      position: 21,
      letter: "V",
    },
    wiring: RotorWirings.III
  },
  IV: {
    notch: {
      position: 9,
      letter: "J",
    },
    wiring: RotorWirings.IV

  },
  V: {
    notch: {
      position: 25,
      letter: "Z",
    },
    wiring: RotorWirings.V
  }
}

export class Rotor {
  #wiring: RotorWirings
  #inputWiringAsIndexArray: number[] = []
  #outputWiringAsIndexArray: number[] = []
  #notch: typeof rotorConfigurations.I.notch

  constructor (public readonly name: Rotors, public position: number, public ringSetting: number) {
    this.#wiring = rotorConfigurations[name].wiring
    this.#notch = rotorConfigurations[name].notch
    this.#createInputWirings()
  }

  isAtNotch () {
    return this.position === this.#notch.position
  }

  turn () {
    this.position = (this.position + 1) % 26
  }

  reset () {
    this.position = 0
    this.ringSetting = 0
  }

  /**
   * The input wiring is the wiring that the rotor sends to the next rotor
   * This is the same as saying that the input wiring is the electric current from right to left
   * For example, rightmost rotor receives input from the input wheel (entry disk or ETW) as a letter
   * This letter is then sent to the next rotor to the left, the index of this array is the index of the letter
   * which will be sent to the next rotor to the left.
   *
   * The output wiring is the wiring that the rotor receives from the previous rotor, which is the opposite
   * of the input wiring. The output wiring is the electric current from left to right.
   *
   * Example with Rotor I:
   * The wiring is EKMFLGDQVZNTOWYHXUSPAIBRCJ
   * The input wiring is the letter on the right-hand side of the rotor mapped to the left-hand side
   * the final array is:
   * [
   *  4,  10, 12, 5,  11, 6,  3,  16,
   *  21, 25, 13, 19, 14, 22, 24, 7,
   *  23, 20, 18, 15,  0, 8,  1,  17,
   *  2,  9
   * ]
   * This means that the letter A (0) will be sent to the next rotor as the letter E (4).
   *
   * The output wiring is the opposite of this, the letter on the left-hand side of the rotor is mapped to the right-hand side
   * the final array is:
   * [
   *   20, 22, 24,  6,  0,  3,  5, 15,
   *   21, 25,  1,  4,  2, 10, 12, 19,
   *   7, 23, 18, 11, 17,  8, 13, 16,
   *   14,  9
   * ]
   * This means that the letter E (4) will be sent to the next rotor as the letter A (0), the opposite of the above.
   */
  #createInputWirings () {
    const inputWiring = this.#wiring.split('')
    for (let [index, letter] of inputWiring.entries()) {
      const letterIndex = toAlphabetIndex(letter)
      this.#inputWiringAsIndexArray[index] = letterIndex
      this.#outputWiringAsIndexArray[letterIndex] = index
    }

    /**
     * There's another way to do this, but it takes two iterations of the array.
     */
    // this.#inputWiringAsIndexArray = this.#wiring.split('').map(letter => alphabetIndex(letter))
    // this.#outputWiringAsIndexArray = this.#inputWiringAsIndexArray.map((_, i) => this.#inputWiringAsIndexArray.indexOf(i))
  }

  #encode (letter: string, direction: RotorDirection) {
    const letterIndex = toAlphabetIndex(letter)
    const shift = this.position - this.ringSetting
    const wireMapping = {
      [RotorDirection.INPUT]: this.#inputWiringAsIndexArray,
      [RotorDirection.OUTPUT]: this.#outputWiringAsIndexArray,
    }[direction]

    /**
     * Input letter as an alphabet index from 0
     * Shift the index by the position of the rotor - the ring setting
     * Sum 26 just so we can get the new index as a positive number
     * Normalize to a number between 0 and 25 which is in the alphabet
     * Ex: letterIndex = 0 (A), position = 1 (B, as it turns before the input), ringSetting = 0 (no shift), mapping = Input (look at #createInputWirings)
     * wireMapping[(0 + 1 - 0 +26) % 26] = wireMapping[27%26] = wireMapping[1] = 10 => K (alphabet index - 1 since we start from 0, otherwise it would be 11 as 10 is J)
    */
    const outboundLetterIndex = wireMapping[normalizeToAlphabetBounds(letterIndex + shift)]

    // Sending the letter one shift below to the next rotor
    return normalizeToAlphabetBounds(outboundLetterIndex - shift)
  }

  encodeForward (letter: string) {
    return this.#encode(letter, RotorDirection.INPUT)
  }

  encodeReturn (letter: string) {
    return this.#encode(letter, RotorDirection.OUTPUT)
  }
}
