// React
import React from "react";
import { TypographyVariant_ENUM } from "./constants";
// type import
import type { IOverridable, IIdentifiable, IStylable } from "../../types";
// Styles
import styles from "./Typography.module.scss";

interface ITypographyProps extends IIdentifiable, IStylable, IOverridable {
  variant: TypographyVariant_ENUM;
}

function Typography(props: React.PropsWithChildren<ITypographyProps>) {
  const className =
    props.override != null
      ? `${styles[props.variant]} ${props.override}`
      : styles[props.variant];
  return (
    <span className={className} style={props.style}>
      {props.children}
    </span>
  );
}
export default Typography;
export { TypographyVariant_ENUM };
export type { ITypographyProps };
