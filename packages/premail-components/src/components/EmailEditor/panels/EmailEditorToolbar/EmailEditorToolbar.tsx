import React from "react";
import { Surface } from "../../../Surface/Surface";
import { EmailEditorToolbarSwitcher } from "./components/EmailEditorToolbarSwitcher/EmailEditorToolbarSwitcher";
import styles from "./EmailEditorToolbar.module.scss";

interface IEmailEditorToolbarProps {}

const EmailEditorToolbar = (_props: IEmailEditorToolbarProps) => {
  return (
    <Surface
      border={{
        disableBorderBlockStart: true,
        disableBorderBlockEnd: true,
        disableBorderInlineEnd: true,
      }}
      override={styles.root}
    >
      <EmailEditorToolbarSwitcher />
    </Surface>
  );
};

export { EmailEditorToolbar };
