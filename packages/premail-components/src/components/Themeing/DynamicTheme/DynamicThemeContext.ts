import React from "react";
import { DynamicTheme, IDynamicThemeContext } from "./types";

const defaultValues: IDynamicThemeContext = {
  theme: null,
  setTheme: (_theme: DynamicTheme) => {},
};

/**
 * The React Dynamic Theme Context that provides the current static theme.
 */
const DynamicThemeContext =
  React.createContext<IDynamicThemeContext>(defaultValues);

export { DynamicThemeContext, defaultValues };
export type { IDynamicThemeContext };
