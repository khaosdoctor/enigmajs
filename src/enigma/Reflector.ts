import { toAlphabetIndex } from '../util'

export enum Reflectors {
  A = "A",
  B = "B",
  C = "C"
}

const reflectorConfigurations = {
  [Reflectors.A]: "EJMZALYXVBWFCRQUONTSPIKHGD",
  [Reflectors.B]: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
  [Reflectors.C]: "FVPJIAOYEDRZXWGCTKUQSBNMHL"
}

export class Reflector {
  #wiring: string
  #inputWiringAsIndexArray: number[] = []

  constructor (public readonly name: Reflectors) {
    this.#wiring = reflectorConfigurations[name]
    // see src/enigma/Rotor.ts#122 for explanation
    this.#inputWiringAsIndexArray = this.#wiring.split("").map(toAlphabetIndex)
  }

  public reflect (letterIndex: number) {
    return this.#inputWiringAsIndexArray[letterIndex]
  }

  [Symbol.toStringTag] = `Reflector`
  toString() {
    return `${this[Symbol.toStringTag]} ${this.name}`
  }
}
