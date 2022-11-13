import { Element, NodeMatch } from "slate";
import type { EditorMarks } from "slate";

import { IRenderToolbarProps } from "./EditorBlock";
import { InlineToolbarButtonType } from "../../panels/InlineToolbar";

interface IGetMarkButtonArgs
  extends Pick<IRenderToolbarProps, "marks" | "addMark"> {
  buttontype: InlineToolbarButtonType;
  toggleMark: keyof EditorMarks;
}

const getMarkButton = (args: IGetMarkButtonArgs) => {
  const buttonActive = args.marks
    ? args.marks[args.toggleMark] === true
    : false;
  const onButtonClick = () => {
    args.addMark(args.toggleMark, !buttonActive);
  };

  return {
    type: args.buttontype,
    onClick: onButtonClick,
    active: buttonActive,
  };
};
interface IGetElementAttrButtonArgs<
  T extends keyof Omit<Element, "type" | "children">
> extends Pick<
    IRenderToolbarProps,
    "getMatchedElements" | "setElementsAttribute"
  > {
  buttonType: InlineToolbarButtonType;
  attrName: T;
  attrValue: Omit<Element, "type" | "children">[T];
}

const getElementAttrButton = <
  T extends keyof Omit<Element, "type" | "children">
>(
  args: IGetElementAttrButtonArgs<T>
) => {
  const [matched] = args.getMatchedElements((s) => {
    return Element.isElement(s) && s[args.attrName] == args.attrValue;
  });
  let valueActive = !!matched;

  const onButtonClick = () => {
    args.setElementsAttribute(args.attrName, args.attrValue);
  };

  return {
    type: args.buttonType,
    active: valueActive,
    onClick: onButtonClick,
  };
};

export { getMarkButton, getElementAttrButton };
export type { IGetMarkButtonArgs, IGetElementAttrButtonArgs };
