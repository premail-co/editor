import React from "react";
import { useEditor } from "@craftjs/core";
import { LayoutBlockDraggable } from "./LayoutBlockDraggable";
import { Row2Col } from "../../../../../blocks/Row/index";

const InsertC6C6Row = () => {
  const { connectors } = useEditor();

  return (
    <LayoutBlockDraggable
      cols={["visibleColHalf", "visibleColHalf"]}
      ref={(ref) => {
        if (ref) connectors.create(ref, <Row2Col />);
      }}
    />
  );
};

export { InsertC6C6Row };
