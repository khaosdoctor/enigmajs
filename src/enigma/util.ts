export function alphabetIndex (letter: string): number {
  return (letter.toUpperCase().charCodeAt(0) - 65) % 26
}

export function alphabetLetter (index: number): string {
  return String.fromCharCode(index + 65)
}
