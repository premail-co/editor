import React from "react";
import {
  EditorBlock,
  IEditorBlockProps,
  IRenderToolbarProps,
} from "./EditorBlock";
import { getElementAttrButton, getMarkButton } from "./getEditorButton";
import {
  InlineToolbar,
  InlineToolbarButtonType,
} from "../../panels/InlineToolbar";

import type {
  IGetMarkButtonArgs,
  IGetElementAttrButtonArgs,
} from "./getEditorButton";

const renderToolbar = (props: IRenderToolbarProps) => {
  const buttonConfig: IGetMarkButtonArgs[] = [
    {
      buttontype: InlineToolbarButtonType.BOLD,
      toggleMark: "bold",
      marks: props.marks,
      addMark: props.addMark,
    },
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

  const markButtons = buttonConfig.map(getMarkButton);

  const alignButtons: IGetElementAttrButtonArgs<"text-align">[] = [
    {
      buttonType: InlineToolbarButtonType.TEXT_ALIGN_LEFT,
      getMatchedElements: props.getMatchedElements,
      setElementsAttribute: props.setElementsAttribute,
      attrName: "text-align",
      attrValue: "left",
    },
    {
      buttonType: InlineToolbarButtonType.TEXT_ALIGN_CENTER,
      getMatchedElements: props.getMatchedElements,
      setElementsAttribute: props.setElementsAttribute,
      attrName: "text-align",
      attrValue: "center",
    },
    {
      buttonType: InlineToolbarButtonType.TEXT_ALIGN_RIGHT,
      getMatchedElements: props.getMatchedElements,
      setElementsAttribute: props.setElementsAttribute,
      attrName: "text-align",
      attrValue: "right",
    },
    {
      buttonType: InlineToolbarButtonType.TEXT_ALIGN_JUSTIFY,
      getMatchedElements: props.getMatchedElements,
      setElementsAttribute: props.setElementsAttribute,
      attrName: "text-align",
      attrValue: "justify",
    },
  ];

  const alignButtonsConfig = alignButtons.map(getElementAttrButton);

  return (
    <InlineToolbar buttonConfig={[...markButtons, ...alignButtonsConfig]} />
  );
};

interface RichTextBlock extends Pick<IEditorBlockProps, "value"> {}

const RichTextBlock = (props: RichTextBlock) => {
  return (
    <EditorBlock
      value={props.value}
      labelText={"Text"}
      renderToolbar={renderToolbar}
    />
  );
};

export { RichTextBlock };
