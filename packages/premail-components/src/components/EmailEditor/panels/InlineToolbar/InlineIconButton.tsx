import React from "react";
import {
  IAriaLabel,
  IButton,
  IClickable,
  IOverridable,
  ITabIndex,
} from "../../../../types/index";

import { IEmailStylable } from "../../types/index";

interface IInlineIconButtonProps
  extends IClickable<HTMLButtonElement>,
    IAriaLabel,
    IButton,
    IOverridable,
    IEmailStylable,
    ITabIndex {
  active: boolean;
}

const InlineIconButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<IInlineIconButtonProps>
>((props, ref) => {
  const overrideClassName = props.override ?? "";
  return (
    <>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        className={`${overrideClassName}`}
        style={{
          cursor: "pointer",
          userSelect: "none",
          backgroundColor: props.active ? "#e6e6e6" : "#ffffff",
          border: "none",
          padding: "5px",
          margin: "0px",
          color: "#000000",
        }}
        title={props.title}
        ref={ref}
        onClick={props.onClick}
        disabled={props.disabled}
        aria-label={props["aria-label"]}
        tabIndex={props.tabIndex}
      >
        {props.children}
      </button>
    </>
  );
});
export { InlineIconButton };
export type { IInlineIconButtonProps };
