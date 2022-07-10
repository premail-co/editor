import React from "react";
import styles from "./Card.module.scss";
import { WithOverrides } from "../../types";

type CardPropsType = WithOverrides<React.PropsWithChildren<{}>>;

function Card(props: CardPropsType) {
  return (
    <div className={`${styles.root} ${props.override}`} style={props.style}>
      {props.children}
    </div>
  );
}
export default Card;
export type { CardPropsType };
