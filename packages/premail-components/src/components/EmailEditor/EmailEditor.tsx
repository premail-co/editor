import React from "react";
import { Editor, Frame, Element } from "@craftjs/core";
import { DashboardTemplate } from "../DashboardTemplate/DashboardTemplate";
import { EmailPreviewFrame } from "./panels/EmailEditorPreviewFrame";
import { EmailEditorToolbar } from "./panels/EmailEditorToolbar/EmailEditorToolbar";
import { StateContextProvider } from "@premail/state";
import { ToolBarStoreDefinition } from "./stores/ToolbarStore/ToolbarStore";
import { ContentRootBlock } from "./blocks/ContentRootBlock";
import { HeaderBlock, RichTextBlock } from "./blocks/EditorBlock";
import { Row1Col, Row2Col } from "./blocks/Row";
import { ColSpan4, ColSpan2 } from "./blocks/Col";

const EmailEditor = () => {
  return (
    <StateContextProvider injectables={[ToolBarStoreDefinition]}>
      <Editor
        resolver={{
          ContentRootBlock,
          HeaderBlock,
          RichTextBlock,
          Row1Col,
          ColSpan4,
          Row2Col,
          ColSpan2,
        }}
      >
        <DashboardTemplate
          previewArea={
            <EmailPreviewFrame id="preview-frame">
              <Frame>
                <Element is={ContentRootBlock} id="editor-root" canvas>
                  Insert content here
                </Element>
              </Frame>
            </EmailPreviewFrame>
          }
          toolbar={<EmailEditorToolbar></EmailEditorToolbar>}
        />
      </Editor>
    </StateContextProvider>
  );
};

export { EmailEditor };
