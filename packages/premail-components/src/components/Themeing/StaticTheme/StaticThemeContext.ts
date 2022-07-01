import React from "react";
import type { IStaticThemeContext, StaticTheme } from "./types";

/**
 * Static Theme Context default values
 */
const defaultValues: IStaticThemeContext = {
  theme: null,
  setTheme: (_theme: StaticTheme) => {},
};

/**
 * The React Static Theme Context that provides the current static theme.
 */
const StaticThemeContext =
  React.createContext<IStaticThemeContext>(defaultValues);

export { StaticThemeContext, defaultValues };
export type { IStaticThemeContext };
