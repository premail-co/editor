import React from "react";
import styles from "./index.module.scss";
const TabWrapper = (props: React.PropsWithChildren<{}>) => {
  return <div className={styles.root}>{props.children}</div>;
};

export { TabWrapper };
