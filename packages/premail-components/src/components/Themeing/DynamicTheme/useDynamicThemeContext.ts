import React from "react";
import { DynamicThemeContext } from "./DynamicThemeContext";

/**
 * React hook to use the current dynamic theme value.
 * @returns The themeing context.
 */
const useDynamicThemeContext = () => {
  const theme = React.useContext(DynamicThemeContext);
  return theme;
};

export { useDynamicThemeContext };
