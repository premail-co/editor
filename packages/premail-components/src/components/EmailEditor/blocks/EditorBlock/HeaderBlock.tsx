import React from "react";
import { EditorBlock, IRenderToolbarProps } from "./EditorBlock";
import {
  InlineToolbar,
  InlineToolbarButtonType,
} from "../../panels/InlineToolbar";
import { getMarkButton } from "./getEditorButton";
import type { IGetMarkButtonArgs } from "./getEditorButton";
import { Descendant } from "slate";

const renderToolbar = (props: IRenderToolbarProps) => {
  return React.useMemo(() => {
    const buttonConfig: IGetMarkButtonArgs[] = [
      {
        buttontype: InlineToolbarButtonType.ITALIC,
        toggleMark: "italic",
        marks: props.marks,
        addMark: props.addMark,
      },
      {
        buttontype: InlineToolbarButtonType.UNDERLINE,
        toggleMark: "underline",
        marks: props.marks,
        addMark: props.addMark,
      },
      {
        buttontype: InlineToolbarButtonType.STRIKETHROUGH,
        toggleMark: "strikethrough",
        marks: props.marks,
        addMark: props.addMark,
      },
      {
        buttontype: InlineToolbarButtonType.SUBSCRIPT,
        toggleMark: "subscript",
        marks: props.marks,
        addMark: props.addMark,
      },
      {
        buttontype: InlineToolbarButtonType.SUPERSCRIPT,
        toggleMark: "superscript",
        marks: props.marks,
        addMark: props.addMark,
      },
    ];
    return <InlineToolbar buttonConfig={buttonConfig.map(getMarkButton)} />;
  }, [props.addMark, props.marks]);
};

interface IHeaderBlock {
  value: Descendant[];
}

const HeaderBlock = (props: IHeaderBlock) => {
  return (
    <EditorBlock
      value={props.value}
      labelText={"Header"}
      renderToolbar={renderToolbar}
    />
  );
};

export { HeaderBlock };
