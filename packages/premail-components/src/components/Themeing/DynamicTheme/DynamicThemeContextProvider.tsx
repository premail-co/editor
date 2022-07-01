import React from "react";
import { themeingClassName } from "./constants";
import { DynamicThemeContext } from "./DynamicThemeContext";
import { themeToStyles } from "./themeToStyles";
import { DynamicTheme } from "./types";

interface IDynamicThemeContextProviderProps
  extends React.PropsWithChildren<{}> {
  initialTheme?: DynamicTheme;
  styleNodeId?: string;
}

/**
 * Dynamic themeing Provider
 * @param props Dynamic Theme Provider Props
 * @returns The Dynamic themeing Provider component
 */
const DynamicThemeContextProvider = (
  props: IDynamicThemeContextProviderProps
) => {
  const [theme, setTheme] = React.useState<DynamicTheme | null>(
    props.initialTheme || null
  );
  const styleNodeRef = React.useRef<HTMLStyleElement>(
    document.createElement("style")
  );

  /** Inject style node to Head and add themeing class to body*/
  React.useLayoutEffect(() => {
    document.head.appendChild(styleNodeRef.current);
    document.body.classList.add(themeingClassName);
    return () => {
      document.head.removeChild(styleNodeRef.current);
      document.body.classList.remove(themeingClassName);
    };
  }, []);

  /** Set styleNodeRef.current id attribute on mount, update on props.styleNodeId change  */
  React.useEffect(() => {
    if (props.styleNodeId == null) return;
    styleNodeRef.current.id = props.styleNodeId;
  }, [props.styleNodeId]);

  /** Update style node to new theme*/
  React.useLayoutEffect(() => {
    if (theme != null) {
      styleNodeRef.current.innerHTML = themeToStyles(theme);
    }
    return () => {
      styleNodeRef.current.innerHTML = "";
    };
  }, [theme]);

  return (
    <DynamicThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {props.children}
    </DynamicThemeContext.Provider>
  );
};

export { DynamicThemeContextProvider };
export type { IDynamicThemeContextProviderProps };
