import React from "react";
import { useEditor } from "@craftjs/core";
import { ContentBlockDraggable } from "../ContentBlockDraggable/index";
import { RichTextBlock } from "../../../../../../blocks/EditorBlock/RichTextBlock";

const InsertTextDraggable = () => {
  const { connectors } = useEditor();

  return (
    <ContentBlockDraggable
      type="text"
      title="Text"
      ref={(ref) => {
        if (ref)
          connectors.create(
            ref,
            <RichTextBlock
              value={[
                {
                  type: "paragraph",
                  "text-align": "left",
                  children: [{ text: "This is a text element." }],
                },
              ]}
            />
          );
      }}
    />
  );
};

export { InsertTextDraggable };
