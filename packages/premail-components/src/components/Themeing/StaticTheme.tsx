import React from "react";
import type { StaticTheme } from "./types";

/**
 * Static Theme Context Inteface
 */
interface IStaticThemeContext {
  theme: StaticTheme | null;
  setTheme: (_theme: StaticTheme) => void;
}

/**
 * The React Static Theme Context that provides the current static theme.
 */
const StaticThemeContext = React.createContext<IStaticThemeContext>({
  theme: null,
  setTheme: (_theme: StaticTheme) => {},
});

type StaticThemeProviderProps = React.PropsWithChildren<{
  initialTheme?: StaticTheme;
}>;

/**
 * Static themeing Provider
 * @param props StaticThemeProviderProps
 * @returns The Static themeing Provider component
 */
const StaticThemeProvider = (props: StaticThemeProviderProps) => {
  const [theme, setTheme] = React.useState<StaticTheme | null>(
    props.initialTheme || null
  );
  const previousTheme = React.useRef<StaticTheme | null>(null);

  /* Initializes changes theme values */
  React.useEffect(() => {
    if (previousTheme.current != null) {
      document.body.classList.remove(previousTheme.current.name);
    }
    if (theme != null) {
      document.body.classList.add(theme.name);
    }
    previousTheme.current = theme;

    return () => {
      if (theme != null) {
        document.body.classList.remove(theme.name);
      }
    };
  }, [theme && theme.name]);

  return (
    <StaticThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {props.children}
    </StaticThemeContext.Provider>
  );
};

/**
 * React hook to use the current static theme value.
 * @returns The themeing context.
 */
const useStaticThemeContext = () => {
  const theme = React.useContext(StaticThemeContext);
  return theme;
};

export { StaticThemeProvider, useStaticThemeContext, StaticThemeContext };
export type { IStaticThemeContext };
