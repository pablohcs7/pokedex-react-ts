export function setFirstLetterUppercase(word: string) {
  const wordUppercase = word[0].toUpperCase() + word.substring(1)

  return wordUppercase
}
