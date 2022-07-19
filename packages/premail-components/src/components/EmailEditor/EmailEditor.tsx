import React from "react";
import { DashboardTemplate } from "../DashboardTemplate/DashboardTemplate";
import { EmailPreviewFrame } from "./panels/EmailEditorPreviewFrame";
import { EmailEditorToolbar } from "./panels/EmailEditorToolbar/EmailEditorToolbar";
import { StateContextProvider } from "@premail/state";
import { ToolBarStoreDefinition } from "./stores/ToolbarStore/ToolbarStore";

const EmailEditor = () => {
  return (
    <StateContextProvider injectables={[ToolBarStoreDefinition]}>
      <DashboardTemplate
        previewArea={<EmailPreviewFrame id="preview-frame"></EmailPreviewFrame>}
        toolbar={<EmailEditorToolbar></EmailEditorToolbar>}
      />
    </StateContextProvider>
  );
};

export { EmailEditor };
