import React from "react";
import { themeingClassName } from "./constants";
import { DynamicTheme } from "./types";
/**
 * Static Theme Context Inteface
 */
interface IDynamicThemeContext {
  theme: DynamicTheme | null;
  setTheme: (_theme: DynamicTheme) => void;
}

/**
 * The React Dynamic Theme Context that provides the current static theme.
 */
const DynamicThemeContext = React.createContext<IDynamicThemeContext>({
  theme: null,
  setTheme: (_theme: DynamicTheme) => {},
});

const themeToStyles = (theme: DynamicTheme): string => {
  const styles = Object.entries(theme.values).reduce(
    (acc: string, next: [string, string]) => {
      return `${acc}\n ${next[0]}: ${next[1]}`;
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
type DynamicThemeProviderProps = React.PropsWithChildren<{
  initialTheme?: DynamicTheme;
}>;

/**
 * Dynamic themeing Provider
 * @param props Dynamic Theme Provider Props
 * @returns The Dynamic themeing Provider component
 */
const DynamicThemeProvider = (props: DynamicThemeProviderProps) => {
  const [theme, setTheme] = React.useState<DynamicTheme | null>(
    props.initialTheme || null
  );
  const styleNodeRef = React.useRef<HTMLStyleElement>(
    document.createElement("style")
  );

  /* Inject style node to Head and add themeing class to body*/
  React.useEffect(() => {
    document.head.appendChild(styleNodeRef.current);
    document.body.classList.add(themeingClassName);
    return () => {
      document.head.removeChild(styleNodeRef.current);
      document.body.classList.remove(themeingClassName);
    };
  }, []);

  /* Update style node to new theme*/
  React.useEffect(() => {
    if (theme != null) {
      styleNodeRef.current.innerHTML = themeToStyles(theme);
    }
  }, [theme]);

  return (
    <DynamicThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {props.children}
    </DynamicThemeContext.Provider>
  );
};

/**
 * React hook to use the current dynamic theme value.
 * @returns The themeing context.
 */
const useDynamicThemeContext = () => {
  const theme = React.useContext(DynamicThemeContext);
  return theme;
};

export { DynamicThemeProvider, useDynamicThemeContext, DynamicThemeContext };
export type { IDynamicThemeContext };
