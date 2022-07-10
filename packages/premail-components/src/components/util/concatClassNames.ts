/**
 * Utility function merges classnames without spaces.
 * @param classNames var args with all the classnames to merge
 * @returns a string with all classNames merged
 */
const concatClassNames = (...classNames: string[]) => {
  if (classNames.length == 0) {
    return "";
  }

  if (classNames.length == 1) {
    return classNames[0];
  }

  return classNames
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
};

export { concatClassNames };
