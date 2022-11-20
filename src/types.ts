import { Reflectors } from './enigma/Reflector.js'
import type { Rotors } from "./enigma/Rotor.js"

export interface GlobalState {
  rotors: {
    left: {
      name: Rotors
      position: number
      ringSetting: number
    }
    middle: {
      name: Rotors
      position: number
      ringSetting: number
    }
    right: {
      name: Rotors
      position: number
      ringSetting: number
    }
  }
  reflector: Reflectors
  plugboard: { [key in AllowedAlphabet]: AllowedAlphabet | '' }
  input: string
  output: string
}

export type AllowedAlphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
