import React from "react";
import {
  StaticThemeContextProvider,
  useStaticThemeContext,
} from "../src/components/Themeing";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import "../src/theme/day-theme.scss";
import "../src/theme/night-theme.scss";
import "../src/theme/variables.scss";

const useStorybookThemeToggle = () => {
  const themeing = useStaticThemeContext();
  const isDayMode = boolean("DAY MODE", true);

  React.useEffect(() => {
    document.body.style.backgroundColor = "var(--backdrop-background-color)";
  }, []);
  React.useEffect(() => {
    if (isDayMode) {
      themeing.setTheme({
        name: "day",
      });
    } else {
      themeing.setTheme({
        name: "night",
      });
    }
  }, [isDayMode]);
};

export const decorators = [
  (Story) => {
    const Temp = () => {
      useStorybookThemeToggle();
      return <Story />;
    };
    return (
      <StaticThemeContextProvider>
        <Temp />
      </StaticThemeContextProvider>
    );
  },
  withKnobs,
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
