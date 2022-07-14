// React
import React from "react";

// type import
import type { IOverridable, IIdentifiable, IStylable } from "../../types";
// Styles
import styles from "./Typography.module.scss";
import { concatClassNames } from "../util/concatClassNames";

type TypographyVariantsType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p1"
  | "p2"
  | "p3";

type RenderElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface ITypographyProps extends IIdentifiable, IStylable, IOverridable {
  variant: TypographyVariantsType;
  renderElement?: RenderElementType;
  bold?: boolean;
  strikethrough?: boolean;
  italic?: boolean;
  link?: boolean;
  disableMargins?: boolean;
}

const getRenderElementFromProps = (
  props: ITypographyProps
): RenderElementType => {
  const el = props.renderElement;
  switch (el) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "p":
    case "span":
      return el;
    default:
      return "span";
  }
};

const Typography = (props: React.PropsWithChildren<ITypographyProps>) => {
  const overrideClassName = props.override ?? "";
  const renderElement = getRenderElementFromProps(props);
  const concatenatedClassNames = React.useMemo(
    () =>
      concatClassNames(
        styles.root,
        props.disableMargins ? styles.disableMargins : "",
        props.link ? styles.link : "",
        props.bold ? styles.bold : "",
        props.italic ? styles.italic : "",
        props.strikethrough ? styles.strikethrough : "",
        styles[props.variant],
        overrideClassName
      ),
    [
      props.disableMargins,
      props.link,
      props.bold,
      props.italic,
      props.strikethrough,
      props.variant,
      overrideClassName,
    ]
  );

  return React.useMemo(
    () =>
      React.createElement(
        renderElement,
        {
          className: concatenatedClassNames,
          style: props.style,
          id: props.id,
        },
        props.children
      ),
    [props.style, renderElement, concatenatedClassNames, props.children]
  );
};

export { Typography };
export type { ITypographyProps };
