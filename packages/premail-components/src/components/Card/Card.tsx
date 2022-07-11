import React from "react";
import styles from "./CardShaded.module.scss";
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

interface ICardProps
  extends IOverridable,
    IStylable,
    React.PropsWithChildren<{}> {
  elevation?: CardElevationType;
  border?: boolean;
  id?: string;
}

const getElevationClassName = (elevation?: string) => {
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
const Card = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ICardProps>
>((props, ref) => {
  const elevationClassName = React.useMemo(
    () => getElevationClassName(props.elevation),
    [props.elevation]
  );
  const bordersClassName = props.border ? styles.border : "";
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
