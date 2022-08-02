import React from "react";
import { TabTitleText } from "../TabTitleText/index";
import { TabGroupWrapper } from "../TabGroupWrapper";
import { Autocomplete } from "../../../../../Autocomplete/Autocomplete";
import { languages } from "./SupportedLanguages";
import styles from "./EmailSettingsTab.module.scss";
import { ColorInput } from "../../../../../Input/ColorInput";
import { TabRootWrapper } from "../TabRootWrapper/index";
import { IAutoCompleteOption } from "../../../../../Autocomplete/Autocomplete.types";

const EmailSettingsTab = () => {
  const [selected, setSelected] =
    React.useState<IAutoCompleteOption<string> | null>(null);
  const onEmailSelection = React.useCallback(
    (v: IAutoCompleteOption<string> | null) => {
      setSelected(v);
    },
    [setSelected]
  );
  return (
    <TabRootWrapper>
      <TabGroupWrapper>
        <TabTitleText>Language</TabTitleText>
        <Autocomplete
          override={styles.languageSelector}
          noMatchLabel={"No language found"}
          id={"autocomplete-story"}
          options={languages}
          selectedOption={selected}
          onSelection={onEmailSelection}
          aria-label={"HTML Email languages combobox"}
        />
      </TabGroupWrapper>

      <TabGroupWrapper>
        <TabTitleText>Background Color</TabTitleText>
        <ColorInput
          id="background-color-input"
          pickerOverride={styles.picker}
          override={styles.colorInputOverride}
        />
      </TabGroupWrapper>
    </TabRootWrapper>
  );
};

export { EmailSettingsTab };
