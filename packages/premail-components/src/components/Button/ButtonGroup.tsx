import React, { CSSProperties } from "react";
import styles from "./ButtonGroup.module.scss";
import { IOverridable } from "../../types/index";

interface IButtonGroupProps
  extends React.PropsWithChildren<{ style?: CSSProperties }>,
    IOverridable {
  outline?: boolean;
}

const ButtonGroup = (props: IButtonGroupProps) => {
  const override = props.override ?? "";

  const outlineStyle = props.outline ? styles.outline : "";
  return (
    <div
      className={`${styles.root} ${outlineStyle} ${override}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export { ButtonGroup };
export type { IButtonGroupProps };
