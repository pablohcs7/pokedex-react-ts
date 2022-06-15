export function setFirstLetterUppercase(word: string) {
  const wordUppercased = word[0].toUpperCase() + word.substring(1)

  return wordUppercased
}
