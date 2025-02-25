type JoinerChar = " " | "" | "-" | "_"

/**
 * Converts a given string to having each individual word capitalized.
 *
 * @remarks
 * NOT Title Case, since words that are typically not capitalized will be.
 * For example, "dawn of war" will convert to "Dawn Of War".
 *
 * @param title - The input string.
 *
 * @returns String with all words having their first letter capitalized.
 */
function customCapitalizer(title: string, joiner: JoinerChar) : string {
  // Add a space before capital letters in Pascal/camelCase, then operate on string
  return (
    title.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .replace('_', ' ')
      .replace('-', ' ')
      .toLowerCase()
      .split(' ')
      .map((word: string) => {
        return word.charAt(0).toUpperCase() + word.substring(1)
      })
      .join(joiner)
  )
}

/**
 * Capitalize each word in a string, joined with a specified joiner character.
 *
 * @param str - The string to replace newlines with breaks.
 * @param joiner - The character used to join the words. "" by default.
 *
 * @returns String with capitalized words, joined with the joiner character.
 */
export function capitalizeEachWord(str: string, joiner: JoinerChar = "") : string {
  return customCapitalizer(str, joiner)
}

/**
 * Convert a string to PascalCase.
 *
 * @param str - The string to convert into PascalCase.
 *
 * @returns String in PascalCase.
 */
export function pascalCase(str: string) : string { return customCapitalizer(str, "") }

/**
 * Replace all instances of '\n' in a string with the JSX element <br />.
 *
 * @param str - The string to replace newlines with breaks.
 *
 * @returns ReactNode representing the text with breaks replacing newlines.
 */
export function newlineToBreak(str: string) : React.ReactNode {
  return str.split('\n')
    .flatMap((item) => [item, <br />])
    .slice(0, -1)
}
