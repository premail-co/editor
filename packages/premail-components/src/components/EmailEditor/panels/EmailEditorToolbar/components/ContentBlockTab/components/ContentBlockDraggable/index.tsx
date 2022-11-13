import React from "react";

import { Header, Text } from "@premail/icons";

import { Surface, SurfaceRefType } from "../../../../../../../Surface";
import { Typography } from "../../../../../../../Typography/Typography";

import styles from "./index.module.scss";

const icons = {
  header: Header,
  text: Text,
};

interface IContentBlockDraggableProps {
  type: keyof typeof icons;
  title: string;
}

const ContentBlockDraggable = React.forwardRef<
  SurfaceRefType,
  IContentBlockDraggableProps
>((props, ref) => {
  const Icon = icons[props.type];

  return (
    <Surface border override={styles.item} ref={ref}>
      <Icon className={styles.itemIcon} />
      <Typography
        variant={"p2"}
        renderElement="span"
        override={styles.itemText}
        disableMargins
      >
        {props.title}
      </Typography>
    </Surface>
  );
});

export { ContentBlockDraggable };
