import React from "react";
import { Surface } from "../../../Surface/Surface";
import { ToolbarTab } from "../../stores/ToolbarStore/ToolbarStore";
import { ContentBlockTab } from "./components/ContentBlockTab/ContentBlockTab";
import { LayoutBlockTab } from "./components/LayoutBlockTab/LayoutBlockTab";
import { EmailEditorToolbarSwitcher } from "./components/EmailEditorToolbarSwitcher/EmailEditorToolbarSwitcher";
import styles from "./EmailEditorToolbar.module.scss";
import { useActiveTab } from "./hooks/useActiveTab";

interface IEmailEditorToolbarProps {}

const EmailEditorToolbar = (_props: IEmailEditorToolbarProps) => {
  const { activeTab } = useActiveTab();
  if (activeTab == null) {
    return null;
  }

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
      {activeTab == ToolbarTab.CONTENT ? <ContentBlockTab /> : ""}
      {activeTab == ToolbarTab.LAYOUT ? <LayoutBlockTab /> : ""}
    </Surface>
  );
};

export { EmailEditorToolbar };
