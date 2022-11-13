import React from "react";
import { Move, Close } from "@premail/icons";

interface IBlockOutlineProps extends React.PropsWithChildren<{}> {
  active: boolean;
  lightColor?: boolean;
  labelText?: string;
  elevate?: boolean;
  onDelete?: () => void;
}

interface IBlockOutlineRef {
  wrapper: HTMLDivElement | null;
  dragIcon: HTMLDivElement | null;
}

/**
 * Renders a block ouline for droppable blocks
 * @param props
 * @returns
 */
const BlockOutline = React.forwardRef<IBlockOutlineRef, IBlockOutlineProps>(
  (props, ref) => {
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const dragIconRef = React.useRef<HTMLDivElement | null>(null);

    React.useImperativeHandle(ref, () => ({
      get wrapper() {
        return wrapperRef.current;
      },
      get dragIcon() {
        return dragIconRef.current;
      },
    }));

    const outlineColor = props.lightColor ? "#2885c1" : "#2f5ee2";

    return (
      <div
        style={{
          position: "relative",
          display: "block",
          zIndex: props.elevate ? 3 : 0,
        }}
        ref={wrapperRef}
      >
        {props.labelText && (
          <span
            style={{
              position: "absolute",
              color: "white",
              backgroundColor: outlineColor,
              padding: 3,
              top: 0,
              right: 0,
              transform: "translate(0%, -100%)",
              fontSize: "12px",
              lineHeight: "12px",
              display: props.active ? "inline-block" : "none",
              userSelect: "none",
              zIndex: 3,
            }}
          >
            {props.labelText}
          </span>
        )}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            right: 0,
            top: 0,
            left: 0,
            bottom: 0,
            boxShadow: `0 0 0 1px ${outlineColor}`,
            // transition: "opacity 1s ease-out",
            display: props.active ? "block" : "none",
            // opacity: props.active ? 1 : 0,

            zIndex: 1,
          }}
        ></div>
        <div
          ref={dragIconRef}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translate(100%, -50%)",
            display: props.active ? "inline-block" : "none",
            cursor: "grab",
            userSelect: "none",
            zIndex: 3,
          }}
        >
          <Move
            style={{
              width: "25px",
              height: "25px",
              color: "white",
              backgroundColor: outlineColor,
              padding: 5,
              boxSizing: "border-box",
              borderRadius: "0% 50% 50% 0%",
            }}
          ></Move>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            display: props.active ? "block" : "none",
            cursor: "pointer",
            userSelect: "none",
            zIndex: 4,
            width: "25px",
            height: "25px",
          }}
        >
          <Close
            onClick={props.onDelete}
            style={{
              display: "block",
              color: "white",
              backgroundColor: outlineColor,
            }}
          />
        </div>
        {props.children}
      </div>
    );
  }
);

export { BlockOutline };
export type { IBlockOutlineProps, IBlockOutlineRef };
