import React from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AlignCenter,
} from "@premail/icons";

import { InlineIconButton } from "./InlineIconButton";
import { ButtonGroup } from "../../../Button/ButtonGroup";

const iconStyle = {
  width: "20px",
  height: "20px",
};
enum InlineToolbarButtonType {
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  UNDERLINE = "UNDERLINE",
  STRIKETHROUGH = "STRIKETHROUGH",
  SUBSCRIPT = "SUBSCRIPT",
  SUPERSCRIPT = "SUPERSCRIPT",

  TEXT_ALIGN_JUSTIFY = "TEXT_ALIGN_JUSTIFY",
  TEXT_ALIGN_LEFT = "TEXT_ALIGN_LEFT",
  TEXT_ALIGN_RIGHT = "TEXT_ALIGN_RIGHT",
  TEXT_ALIGN_CENTER = "TEXT_ALIGN_CENTER",
}

const ButtonRendererMap: {
  [key in InlineToolbarButtonType]: any;
} = {
  [InlineToolbarButtonType.BOLD]: Bold,
  [InlineToolbarButtonType.ITALIC]: Italic,
  [InlineToolbarButtonType.UNDERLINE]: Underline,
  [InlineToolbarButtonType.STRIKETHROUGH]: Strikethrough,
  [InlineToolbarButtonType.SUBSCRIPT]: Subscript,
  [InlineToolbarButtonType.SUPERSCRIPT]: Superscript,
  [InlineToolbarButtonType.TEXT_ALIGN_JUSTIFY]: AlignJustify,
  [InlineToolbarButtonType.TEXT_ALIGN_LEFT]: AlignLeft,
  [InlineToolbarButtonType.TEXT_ALIGN_RIGHT]: AlignRight,
  [InlineToolbarButtonType.TEXT_ALIGN_CENTER]: AlignCenter,
};

interface IButtonConfig {
  type: InlineToolbarButtonType;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type ButtonConfigType = Array<IButtonConfig>;

interface IInlineToolbarProps {
  buttonConfig: ButtonConfigType;
}

const InlineToolbar = (props: IInlineToolbarProps) => {
  const renderedButtons = props.buttonConfig.map((buttonConfig, i) => {
    const RenderElement = ButtonRendererMap[buttonConfig.type];
    return (
      <InlineIconButton
        key={`${buttonConfig.type}-${i}`}
        tabIndex={-1}
        onClick={buttonConfig.onClick}
        active={buttonConfig.active}
      >
        <RenderElement style={iconStyle} />
      </InlineIconButton>
    );
  });
  return (
    <ButtonGroup
      style={{
        backgroundColor: "#fff",
        padding: 2,
        border: "1px solid #b3b3b3",
      }}
    >
      {renderedButtons}
    </ButtonGroup>
  );
};

export { InlineToolbar, InlineToolbarButtonType };
export type { IInlineToolbarProps };
