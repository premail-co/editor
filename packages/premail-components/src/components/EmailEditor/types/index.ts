import React from "react";
export interface ICSSProperties {
  background?: string;
  backgroundColor?: string;
  border?: string;
  borderBottom?: string;
  borderBottomColor?: string;
  borderBottomStyle?: React.CSSProperties["borderBottomStyle"];
  borderBottomWidth?: string;
  borderColor?: string;
  borderLeft?: string;
  borderLeftColor?: string;
  borderLeftStyle?: React.CSSProperties["borderLeftStyle"];
  borderLeftWidth?: string;
  borderRight?: string;
  borderRightColor?: string;
  borderRightStyle?: React.CSSProperties["borderRightStyle"];
  borderRightWidth?: string;
  borderStyle?: string;
  borderTop?: string;
  borderTopColor?: string;
  borderTopStyle?: React.CSSProperties["borderTopStyle"];
  borderTopWidth?: string;
  borderWidth?: string;
  color?: string;
  display?: string;
  font?: string;
  fontFamily?: string;
  fontSize?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: "bold" | "normal";
  height?: string;
  letterSpacing?: string;
  lineHeight?: string;
  listStyleType?: string;
  padding?: React.CSSProperties["padding"];
  paddingBottom?: React.CSSProperties["paddingBottom"];
  paddingLeft?: React.CSSProperties["paddingLeft"];
  paddingRight?: React.CSSProperties["paddingRight"];
  paddingTop?: React.CSSProperties["paddingTop"];
  tableLayout?: "auto" | "fixed";
  textAlign?:
    | "center"
    | "end"
    | "justify"
    | "left"
    | "match-parent"
    | "right"
    | "start";
  textDecoration?: string;
  textIndent?: string;
  textTransform?:
    | "capitalize"
    | "full-size-kana"
    | "full-width"
    | "lowercase"
    | "none"
    | "uppercase";
  verticalAlign?: string;

  position?: React.CSSProperties["position"];
  zIndex?: number;
}

export interface IEmailStylable {
  style?: ICSSProperties;
}
