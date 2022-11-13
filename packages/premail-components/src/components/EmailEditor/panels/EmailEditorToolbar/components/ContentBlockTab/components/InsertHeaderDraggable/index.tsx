import React from "react";
import { useEditor } from "@craftjs/core";
import { ContentBlockDraggable } from "../ContentBlockDraggable/index";
import { HeaderBlock } from "../../../../../../blocks/EditorBlock/HeaderBlock";

const InsertHeaderBlockButton = () => {
  const { connectors } = useEditor();

  return (
    <ContentBlockDraggable
      type="header"
      title="Header"
      ref={(ref) => {
        if (ref)
          connectors.create(
            ref,
            <HeaderBlock
              value={[
                {
                  type: "h1",
                  "text-align": "left",
                  children: [{ text: "hello world" }],
                },
              ]}
            />
          );
      }}
    />
  );
};

export { InsertHeaderBlockButton };
