import React from "react";
import { useNode } from "@craftjs/core";

const useDraggableNode = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>
) => {
  const node = useNode();
  React.useEffect(() => {
    if (ref.current != null) {
      node.connectors.connect(ref.current);
      // node.connectors.drag(ref.current);
    }
  }, [node.connectors.connect, node.connectors.drag]);
};

export { useDraggableNode };
