import React from "react";
import { useEditor } from "@craftjs/core";
import { LayoutBlockDraggable } from "./LayoutBlockDraggable";
import { Row1Col } from "../../../../../blocks/Row/index";

const InsertC12Row = () => {
  const { connectors } = useEditor();

  return (
    <LayoutBlockDraggable
      cols={["visibleColFull"]}
      ref={(ref) => {
        if (ref) connectors.create(ref, <Row1Col />);
      }}
    />
  );
};

export { InsertC12Row };
