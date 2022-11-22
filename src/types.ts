import type { Reflector } from './enigma/Reflector.js'
import type { Rotor, RotorPositions } from "./enigma/Rotor.js"

export interface GlobalState {
  rotors: {
    [position in RotorPositions]: Rotor
  }
  reflector: Reflector
  plugboard: { [key in AllowedAlphabet]: AllowedAlphabet | '' }
  input: string
  output: string
}

export type AllowedAlphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
export const ALLOWED_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
