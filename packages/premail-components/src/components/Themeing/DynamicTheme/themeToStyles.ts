import { themeingClassName } from "./constants";
import { DynamicTheme } from "./types";

/**
 * Converts the JSON representation of a @link DynamicTheme into a css ruleset
 * @param theme the dynamic theme to convert to css string
 * @returns a css ruleset with theme specific css attributes
 */
const themeToStyles = (theme: DynamicTheme): string => {
  const styles = Object.entries(theme.values).reduce(
    (acc: string, next: [string, string]) => {
      return `${acc}\n ${next[0]}: ${next[1]};`;
    },
    ""
  );
  return `
      .${themeingClassName}{
          /** Theme: ${theme.name} **/
        ${styles}
      }
    `.trim();
};

export { themeToStyles };
