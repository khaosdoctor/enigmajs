export function toAlphabetIndex (letter: string): number {
  // %26 here is not needed since we'll assume only uppercase letters
  // But added as a type guard to ensure we don't get any unexpected values
  return normalizeToAlphabetBounds(letter.toUpperCase().charCodeAt(0) - 65)
}

export function toChar (index: number): string {
  return String.fromCharCode(index + 65)
}

export function isLetter (letter: string): boolean {
  return letter.match(/[a-z]/i) !== null
}

export function normalizeToAlphabetBounds (value: number): number {
  return (value + 26) % 26
}
