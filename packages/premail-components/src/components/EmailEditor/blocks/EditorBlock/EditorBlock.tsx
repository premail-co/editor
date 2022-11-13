import React from "react";
import { useNode } from "@craftjs/core";
import {
  createEditor,
  Descendant,
  Editor,
  Text,
  Element,
  Transforms,
  NodeMatch,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";
import { BlockOutline, IBlockOutlineRef } from "../../components/Blockoutline";
import { useDebounce } from "../../hooks/useDebounce";
import { NodeEntry } from "slate";

interface IRenderToolbarProps {
  marks: Omit<Text, "text"> | null;
  addMark: (key: keyof Omit<Text, "text">, value: boolean) => void;
  getMatchedElements: (
    matchFn: NodeMatch<Element>
  ) => Generator<NodeEntry<Element>>;
  setElementsAttribute: <T extends keyof Omit<Element, "type" | "children">>(
    key: T,
    value: Omit<Element, "type" | "children">[T]
  ) => void;

  editor: Editor;
}

interface IEditorBlockProps {
  value: Descendant[];
  renderToolbar: (props: IRenderToolbarProps) => JSX.Element;
  labelText: string;
}
const dispatchDebpounceMs = 500;

const EditorBlock = (props: IEditorBlockProps) => {
  const [value, setValue] = React.useState<Descendant[]>(props.value);
  const debouncedValue = useDebounce(value, dispatchDebpounceMs);
  const editor = React.useRef(withReact(createEditor()));
  const blockOutlineRef = React.useRef<IBlockOutlineRef | null>(null);
  const contentEditableRef = React.useRef<HTMLElement | null>(null);
  const node = useNode((node) => ({
    selected: node.events.selected,
    hovered: node.events.hovered,
    dom: node.dom,
  }));

  React.useEffect(() => {
    console.log(`mounted editor block ${props.labelText}`, props.value);
  }, []);
  React.useEffect(() => {
    contentEditableRef.current = ReactEditor.toDOMNode(
      editor.current,
      editor.current
    );
  }, []);

  React.useEffect(() => {
    if (!contentEditableRef.current) return;

    if (node.selected) {
      contentEditableRef.current.tabIndex = 0;
    } else {
      contentEditableRef.current.tabIndex = -1;
    }

    return () => {
      if (!contentEditableRef.current) return;
      contentEditableRef.current.tabIndex = 0;
    };
  }, [node.selected]);

  React.useEffect(() => {
    if (
      blockOutlineRef.current == null ||
      blockOutlineRef.current.wrapper == null ||
      blockOutlineRef.current.dragIcon == null
    )
      return;
    node.connectors.connect(blockOutlineRef.current.wrapper);
    node.connectors.drag(blockOutlineRef.current.dragIcon);
  }, [node.connectors.connect, node.connectors.drag]);

  React.useEffect(() => {
    node.actions.setProp((props: any) => {
      console.log("dispatch changes", debouncedValue);
      props.value = debouncedValue;
    });
  }, [debouncedValue, node.actions.setProp]);

  const renderLeaf = React.useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);
  const renderElement = React.useCallback((props: RenderElementProps) => {
    const style = {};

    switch (props.element.type) {
      case "paragraph":
        return <ParagraphElement {...props} />;
      case "h1":
        return <H1Element {...props} />;
      case "h2":
        return <H2Element {...props} />;
      default:
        return <ParagraphElement {...props} />;
    }
  }, []);

  return React.useMemo(
    () => (
      <BlockOutline
        active={node.selected || node.hovered}
        lightColor={node.hovered && !node.selected}
        elevate={node.selected}
        ref={blockOutlineRef}
        labelText={props.labelText}
      >
        <Slate editor={editor.current} value={value} onChange={setValue}>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            style={{ zIndex: 3 }}
          />
          {node.selected && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: "translate(0%, -100%)",
              }}
            >
              <ToolbarRenderer renderToolbar={props.renderToolbar} />
            </div>
          )}
        </Slate>
      </BlockOutline>
    ),
    [
      node.selected,
      node.hovered,
      value,
      renderElement,
      renderLeaf,
      setValue,
      props.labelText,
      props.renderToolbar,
    ]
  );
};

const ToolbarRenderer = (props: {
  renderToolbar: (props: IRenderToolbarProps) => JSX.Element;
}) => {
  const editor = useSlate();
  const marks = Editor.marks(editor);
  const addMark = React.useCallback<IRenderToolbarProps["addMark"]>(
    (mark, value) => {
      Editor.addMark(editor, mark, value);
    },
    []
  );

  const getMatchedElements = React.useCallback<
    IRenderToolbarProps["getMatchedElements"]
  >(
    (match) => {
      const matchedElements = Editor.nodes<Element>(editor, {
        match: match,
      });
      return matchedElements;
    },
    [editor]
  );

  const setElementsAttribute = React.useCallback<
    IRenderToolbarProps["setElementsAttribute"]
  >(
    (key, value) => {
      Transforms.setNodes(
        editor,
        { [key]: value },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    },
    [editor]
  );

  return props.renderToolbar({
    addMark,
    marks,
    editor,
    getMatchedElements,
    setElementsAttribute,
  });
};

const ParagraphElement = (props: RenderElementProps) => {
  return (
    <p
      {...props.attributes}
      style={{ lineHeight: "140%", textAlign: props.element["text-align"] }}
    >
      {props.children}
    </p>
  );
};

const H1Element = (props: RenderElementProps) => {
  return (
    <h1
      {...props.attributes}
      style={{
        lineHeight: "140%",
        textAlign: props.element["text-align"],
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      {props.children}
    </h1>
  );
};

const H2Element = (props: RenderElementProps) => {
  return (
    <h2
      {...props.attributes}
      style={{ lineHeight: "140%", textAlign: props.element["text-align"] }}
    >
      {props.children}
    </h2>
  );
};

const Leaf = (props: RenderLeafProps) => {
  let children = props.children;
  if (props.leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (props.leaf.italic) {
    children = <em>{children}</em>;
  }

  if (props.leaf.underline) {
    children = <u>{children}</u>;
  }

  if (props.leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    );
  }
  if (props.leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  if (props.leaf.superscript) {
    children = <sup>{children}</sup>;
  }

  return <span {...props.attributes}>{children}</span>;
};

export { EditorBlock };
export type { IRenderToolbarProps, IEditorBlockProps };
