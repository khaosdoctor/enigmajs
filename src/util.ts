export function toAlphabetIndex (letter: string): number {
  // %26 here is not needed since we'll assume only uppercase letters
  // But added as a type guard to ensure we don't get any unexpected values
  //TODO: add function to convert char to charCode in alphabet index
}

export function toChar (index: number): string {
// TODO: Add implementation to get a char from an charCode
}

export function isLetter (letter: string): boolean {
// TODO: Add check to ensure only letters are passed
}

export function normalizeToAlphabetBounds (value: number): number {
// TODO: Add a check to ensure value is within bounds
}
