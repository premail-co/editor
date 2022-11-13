import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

interface Alignment {
  "text-align": "left" | "right" | "justify" | "center";
}

export interface H1Element extends Alignment {
  type: "h1";
  children: CustomText[];
}
export interface H2Element extends Alignment {
  type: "h2";
  children: CustomText[];
}
export interface ParagraphElement extends Alignment {
  type: "paragraph";
  children: CustomText[];
}

export type CustomElement = ParagraphElement | H1Element | H2Element;
export type CustomText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
  strikethrough?: true;
  superscript?: true;
  subscript?: true;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
