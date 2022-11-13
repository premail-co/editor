import React from "react";
import styles from "./LayoutBlockDraggable.module.scss";

interface ILayoutBlockDraggableProps {
  cols: Array<
    | "visibleColFull"
    | "visibleColHalf"
    | "visibleColQuarter"
    | "visibleCol3Quarter"
  >;
}

type LayoutBlockDraggableRef = HTMLDivElement;

const LayoutBlockDraggable = React.forwardRef<
  LayoutBlockDraggableRef,
  ILayoutBlockDraggableProps
>((props, ref) => {
  return (
    <div className={styles.row} ref={ref}>
      {props.cols.map((item) => {
        return <div className={styles[item]} />;
      })}
    </div>
  );
});

export { LayoutBlockDraggable };
export type { ILayoutBlockDraggableProps, LayoutBlockDraggableRef };
