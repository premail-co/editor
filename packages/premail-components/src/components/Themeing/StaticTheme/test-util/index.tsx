import React from "react";
import { useStaticThemeContext } from "../useStaticThemeContext";

const NO_THEME_PLACEHOLDER_TEXT = "NO THEME SET";

const ConsumerThemeToggle = (props: {
  buttonInnerText: string;
  testId: string;
  nameToUpdate: string;
}) => {
  const staticThemeContext = useStaticThemeContext();
  const onClick = React.useCallback(() => {
    staticThemeContext.setTheme({ name: props.nameToUpdate });
  }, [staticThemeContext.setTheme, props.nameToUpdate]);
  return (
    <div>
      Click the button to change theme
      <button onClick={onClick} data-testid={props.testId}>
        {props.buttonInnerText}
      </button>
    </div>
  );
};

const ConsumerThemeDisplay = (props: { themeNameContainerId: string }) => {
  const staticThemeContext = useStaticThemeContext();
  return (
    <div data-testid={props.themeNameContainerId}>
      {staticThemeContext.theme?.name ?? NO_THEME_PLACEHOLDER_TEXT}
    </div>
  );
};

export { ConsumerThemeToggle, ConsumerThemeDisplay, NO_THEME_PLACEHOLDER_TEXT };
