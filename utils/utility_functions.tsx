type JoinerChar = " " | "" | "-" | "_"

function customCapitalizer(title: string, joiner: JoinerChar) : string {
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
    title.replace('_', ' ')
      .replace('-', ' ')
      .toLowerCase()
      .split(' ')
      .map((word: string) => {
        return word.charAt(0).toUpperCase() + word.substring(1)
      })
      .join(joiner)
  )
}

export function capitalizeEachWord(str: string) { return customCapitalizer(str, " ") }
export function pascalCase(str: string) { return customCapitalizer(str, "") }