import React from "react";
import { Element, useEditor, useNode } from "@craftjs/core";
import { Row } from "../../components/Row";
import { ColSpan1, ColSpan2, ColSpan4 } from "../Col";
import { useDraggableNode } from "../../hooks/useDraggableNode";
import { useOutlinePrompt } from "../../hooks/useOutlinePrompt";
import shortid from "shortid";
import { BlockOutline, IBlockOutlineRef } from "../../components/Blockoutline";
import { useInjectable } from "@premail/state";
import {
  ToolBarStoreDefinition,
  ToolbarTab,
} from "../../stores/ToolbarStore/ToolbarStore";
import { IEmailStylable } from "../../types/index";

const useRowRef = () => {
  const ref = React.useRef<HTMLTableElement | null>(null);
  useDraggableNode(ref);
  useOutlinePrompt();
  return ref;
};

const Row4Col = () => {
  const ref = useRowRef();

  return (
    <Row ref={ref}>
      <Element id={shortid.generate()} is={ColSpan1} canvas></Element>
      <Element id={shortid.generate()} is={ColSpan1} canvas></Element>
      <Element id={shortid.generate()} is={ColSpan1} canvas></Element>
      <Element id={shortid.generate()} is={ColSpan1} canvas></Element>
    </Row>
  );
};

const Row2Col = () => {
  const ref = useRowRef();
  return (
    <div style={{ position: "relative" }}>
      <Row ref={ref}>
        <Element id={shortid.generate()} is={ColSpan2} canvas></Element>
        <Element id={shortid.generate()} is={ColSpan2} canvas></Element>
      </Row>
    </div>
  );
};

interface IRowProps extends IEmailStylable {}

const Row1Col = (props: IRowProps) => {
  const ref = React.useRef<IBlockOutlineRef | null>(null);
  const node = useNode((node) => ({
    hovered: node.events.hovered,
    selected: node.events.selected,
    data: node.data.nodes,
  }));
  const editor = useEditor();
  const [colHovered, setColHovered] = React.useState(false);
  React.useEffect(() => {
    if (
      ref.current == null ||
      ref.current.wrapper == null ||
      ref.current.dragIcon == null
    )
      return;
    node.connectors.connect(ref.current.wrapper);
    node.connectors.drag(ref.current.dragIcon);
  }, [node.connectors]);
  const toolbarStore = useInjectable(ToolBarStoreDefinition);

  React.useEffect(() => {
    if (!toolbarStore) {
      return;
    }
    if (node.selected == true) {
      toolbarStore.activeTab.setValue(ToolbarTab.ATTRIBUTE_EDITOR);
      toolbarStore.activeTab.notify();
    } else {
      toolbarStore.activeTab.setValue(ToolbarTab.CONTENT);
      toolbarStore.activeTab.notify();
    }
    toolbarStore.data.setValue({ type: "Row1Col", rowId: node.id });
  }, [node.selected]);

  const id = shortid.generate();

  return (
    <BlockOutline
      ref={ref}
      active={node.hovered || node.selected || colHovered}
      labelText={"Row"}
      lightColor={
        (!node.selected && node.hovered) || (colHovered && !node.selected)
      }
      onDelete={() => {
        editor.actions.delete(node.id);
      }}
    >
      <Row style={{ position: "relative", zIndex: 2, paddingRight: "10px" }}>
        <Element
          id={id}
          is={ColSpan4}
          canvas
          hoverActive={() => {
            setColHovered(true);
          }}
          hoverInactive={() => {
            setColHovered(false);
          }}
          onSelected={() => {
            editor.actions.selectNode(node.id);
          }}
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        ></Element>
      </Row>
    </BlockOutline>
  );
};

export { Row4Col, Row2Col, Row1Col };
