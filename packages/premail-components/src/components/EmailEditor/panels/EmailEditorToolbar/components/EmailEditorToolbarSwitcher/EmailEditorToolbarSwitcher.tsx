import React from "react";
import { ToolbarTab } from "../../../../stores/ToolbarStore/ToolbarStore";
import { Button } from "../../../../../Button/Button";
import { useActiveTab } from "../../hooks/useActiveTab";
import styles from "./EmailEditorToolbarSwitcher.module.scss";
const EmailEditorToolbarSwitcher = () => {
  const { activeTab, setActiveTab } = useActiveTab();
  const setContentActive = React.useCallback(() => {
    setActiveTab(ToolbarTab.CONTENT);
  }, [setActiveTab]);

  const setLayoutActive = React.useCallback(() => {
    setActiveTab(ToolbarTab.LAYOUT);
  }, [setActiveTab]);

  const setEmailSettingsActive = React.useCallback(() => {
    setActiveTab(ToolbarTab.EMAIL_SETINGS);
  }, [setActiveTab]);

  if (activeTab == null) return null;

  return (
    <div className={styles.root}>
      <Button
        variant="plain"
        size="small"
        override={
          activeTab == ToolbarTab.CONTENT
            ? styles.activeTab
            : styles.inactiveTab
        }
        onClick={setContentActive}
      >
        Content
      </Button>
      <Button
        variant="plain"
        size="small"
        override={
          activeTab == ToolbarTab.LAYOUT ? styles.activeTab : styles.inactiveTab
        }
        onClick={setLayoutActive}
      >
        Layout
      </Button>
      <Button
        variant="plain"
        size="small"
        override={
          activeTab == ToolbarTab.EMAIL_SETINGS
            ? styles.activeTab
            : styles.inactiveTab
        }
        onClick={setEmailSettingsActive}
      >
        Email Settings
      </Button>
    </div>
  );
};

export { EmailEditorToolbarSwitcher };
