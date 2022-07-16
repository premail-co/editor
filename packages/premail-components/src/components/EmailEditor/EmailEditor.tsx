import React from "react";
import { DashboardTemplate } from "../DashboardTemplate/DashboardTemplate";
import { EmailPreviewFrame } from "./panels/EmailEditorPreviewFrame";

const EmailEditor = () => {
  return (
    <DashboardTemplate
      previewArea={<EmailPreviewFrame id="preview-frame"></EmailPreviewFrame>}
    />
  );
};

export { EmailEditor };
