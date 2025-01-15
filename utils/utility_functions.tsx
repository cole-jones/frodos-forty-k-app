export function capitalizeEachWord(title: string) : string {
  /**
   * Converts a given string to having each individual word capitalized.
   * 
   * @remarks
   * NOT Title Case, since words that are typically not capitalized will be.
   * For example, "dawn of war" will convert to "Dawn Of War"
   * 
   * @param title - The input string
   * @returns String with all words having their first letter capitalized
   */
  return (
    title.toLowerCase()
      .split(' ')
      .map((word: string) => {
        return word.charAt(0).toUpperCase() + word.substring(1)
      })
      .join('')
  )
}