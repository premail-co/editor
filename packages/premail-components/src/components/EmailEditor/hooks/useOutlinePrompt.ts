import { useNode } from "@craftjs/core";
import React from "react";

const useOutlinePrompt = () => {
  const node = useNode((node) => {
    return {
      hovered: node.events.hovered,
      selected: node.events.selected,
      dom: node.dom,
    };
  });

  React.useEffect(() => {
    if (node.dom) {
      if (node.selected) {
        node.dom.classList.add("selected-elm");
        node.dom.classList.remove("hovered-elm");
      } else if (node.hovered) {
        node.dom.classList.add("hovered-elm");
        node.dom.classList.remove("selected-elm");
      } else {
        node.dom.classList.remove("hovered-elm");
        node.dom.classList.remove("selected-elm");
      }
    }
  }, [node.dom, node.hovered, node.selected]);
};

export { useOutlinePrompt };
