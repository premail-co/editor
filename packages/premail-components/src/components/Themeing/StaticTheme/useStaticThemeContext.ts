import React from "react";
import { StaticThemeContext } from "./StaticThemeContext";

/**
 * React hook to use the current static theme value.
 * @returns The themeing context.
 */
const useStaticThemeContext = () => {
  const theme = React.useContext(StaticThemeContext);
  return theme;
};

export { useStaticThemeContext };
