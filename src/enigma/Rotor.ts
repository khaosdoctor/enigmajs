export enum RotorWirings {
  I = "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  II = "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  III = "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  IV = "ESOVPZJAYQUIRHXLNFTGKDCMWB",
  V = "VZBRGITYUPSDNHLXAWMJQOFECK",
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
  #notch: typeof rotorConfigurations.I.notch

  constructor (private readonly name: Rotors, private position: number, private readonly ringSetting: number) {
    this.#wiring = rotorConfigurations[name].wiring
    this.#notch = rotorConfigurations[name].notch
  }
}
