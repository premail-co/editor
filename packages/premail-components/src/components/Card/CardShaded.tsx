import React from "react";
import styles from "./CardShaded.module.scss";
import { WithOverrides } from "../../types";

type CardShadedPropsType = WithOverrides<
  React.PropsWithChildren<{
    elevation?: CardShadedElevationsEnum;
    border?: boolean;
  }>
>;
enum CardShadedElevationsEnum {
  ONE = "root-elevation-1",
  TWO = "root-elevation-2",
  THREE = "root-elevation-3",
  FOUR = "root-elevation-4",
  FIVE = "root-elevation-5",
  SIX = "root-elevation-6",
  SEVEN = "root-elevation-7",
  EIGHT = "root-elevation-8",
  NINE = "root-elevation-9",
  TEN = "root-elevation-10",
}

const CardShaded = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<CardShadedPropsType>
>((props, ref) => {
  return (
    <div
      className={`${styles.root} ${
        props.elevation == null ? "" : styles[props.elevation]
      } ${props.override} ${props.border ? styles["root-borders"] : ""}`}
      style={props.style}
      ref={ref}
    >
      {props.children}
    </div>
  );
});
export default CardShaded;
export { CardShadedElevationsEnum };
export type { CardShadedPropsType };
