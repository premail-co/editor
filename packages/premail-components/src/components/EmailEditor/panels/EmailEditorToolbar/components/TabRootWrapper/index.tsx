import React from "react";
import styles from "./index.module.scss";
const TabRootWrapper = (props: React.PropsWithChildren<{}>) => {
  return <div className={styles.root}>{props.children}</div>;
};

export { TabRootWrapper };
