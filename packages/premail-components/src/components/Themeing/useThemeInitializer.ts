import React from "react";
import { useStaticThemeContext } from ".";

export const useThemeInitializer = () => {
  const themer = useStaticThemeContext();

  React.useLayoutEffect(() => {
    const cb = (e: MediaQueryListEvent) => {
      const newColorScheme = e.matches ? "night" : "day";
      console.log(newColorScheme);

      themer.setTheme({
        name: newColorScheme,
      });
    };

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", cb);

    const newColorScheme = matchMedia.matches ? "night" : "day";

    themer.setTheme({
      name: newColorScheme,
    });

    return () => {
      matchMedia.removeEventListener("change", cb);
    };
  }, []);
};
