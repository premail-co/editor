import React from "react";
import { Typography } from "../../../../../Typography/Typography";
import styles from "./index.module.scss";

const TabTitleText = (props: React.PropsWithChildren<{}>) => {
  return (
    <Typography variant="p3" bold disableMargins override={styles.title}>
      {props.children}
    </Typography>
  );
};

export { TabTitleText };
