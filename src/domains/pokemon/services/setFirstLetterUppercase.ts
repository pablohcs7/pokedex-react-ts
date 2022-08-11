export function setFirstLetterUppercase(word: string | undefined) {
  if (word == undefined) {
    return
  } else {
    const wordUppercase = word[0].toUpperCase() + word.substring(1)

    return wordUppercase
  }
}
