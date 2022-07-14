import React from "react";
import styles from "./Card.module.scss";
import { IOverridable, IStylable } from "../../types";
import { concatClassNames } from "../util/concatClassNames";

type CardElevationType =
  | "elevation-1"
  | "elevation-2"
  | "elevation-3"
  | "elevation-4"
  | "elevation-5"
  | "elevation-6"
  | "elevation-7"
  | "elevation-8"
  | "elevation-9"
  | "elevation-10";

interface BorderConfig {
  disableBorderBlockStart?: boolean;
  disableBorderInlineStart?: boolean;
  disableBorderInlineEnd?: boolean;
  disableBorderBlockEnd?: boolean;
}

interface ICardProps
  extends IOverridable,
    IStylable,
    React.PropsWithChildren<{}> {
  elevation?: CardElevationType;
  border?: boolean | BorderConfig;
  id?: string;
}

const getCardElevationFromString = (elevation?: string) => {
  switch (elevation) {
    case "elevation-1":
    case "elevation-2":
    case "elevation-3":
    case "elevation-4":
    case "elevation-5":
    case "elevation-6":
    case "elevation-7":
    case "elevation-8":
    case "elevation-9":
    case "elevation-10":
      return styles[elevation];
    default:
      return "";
  }
};

const getBorderStyleFromProps = (border?: boolean | BorderConfig) => {
  if (border == null || border == false) {
    return "";
  }

  if (typeof border == "boolean") {
    return styles.border;
  }
  const borderBlockStart =
    border.disableBorderBlockStart == true
      ? styles["disable-border-block-start"]
      : "";
  const borderInlineEnd =
    border.disableBorderInlineEnd == true
      ? styles["disable-border-inline-end"]
      : "";
  const borderBlockEnd =
    border.disableBorderBlockEnd == true
      ? styles["disable-border-block-end"]
      : "";
  const borderDisableInlineStart =
    border.disableBorderInlineStart == true
      ? styles["disable-border-inline-start"]
      : "";

  return concatClassNames(
    borderBlockStart,
    borderInlineEnd,
    borderBlockEnd,
    borderDisableInlineStart
  );
};

const Card = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ICardProps>
>((props, ref) => {
  const elevationClassName = React.useMemo(
    () => getCardElevationFromString(props.elevation),
    [props.elevation]
  );
  const bordersClassName = React.useMemo(
    () => getBorderStyleFromProps(props.border),
    [JSON.stringify(props.border)]
  );
  const overrideClassName = props.override ?? "";
  const className = React.useMemo(
    () =>
      concatClassNames(
        styles.root,
        elevationClassName,
        bordersClassName,
        overrideClassName
      ),
    [elevationClassName, bordersClassName, overrideClassName]
  );

  return (
    <div id={props.id} className={className} style={props.style} ref={ref}>
      {props.children}
    </div>
  );
});
export { Card };
export type { ICardProps };
