import React from "react";
import { StaticThemeContext } from "./StaticThemeContext";
import { StaticTheme } from "./types";

interface IStaticThemeProviderProps extends React.PropsWithChildren<{}> {
  /**Initial theme value for the context, undefined otherwise */
  initialTheme?: StaticTheme;
}

/**
 * Static themeing Provider
 * @param props StaticThemeProviderProps
 * @returns The Static themeing Provider component
 */
const StaticThemeContextProvider = (props: IStaticThemeProviderProps) => {
  const [theme, setTheme] = React.useState<StaticTheme | null>(
    props.initialTheme || null
  );

  /* Appends theme name to document.body on mount and on update and removes theme name on unmount */
  React.useLayoutEffect(() => {
    if (theme != null) {
      document.body.classList.add(theme.name);
    }

    return () => {
      if (theme != null) {
        document.body.classList.remove(theme.name);
      }
    };
  }, [theme && theme.name]);

  return (
    <StaticThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </StaticThemeContext.Provider>
  );
};

export { StaticThemeContextProvider };
export type { IStaticThemeProviderProps };
