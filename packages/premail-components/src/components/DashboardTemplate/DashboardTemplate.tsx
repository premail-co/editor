import React from "react";
import styles from "./DashboardTemplate.module.scss";

interface IDashboardTemplateProps {
  headerContents?: React.ReactNode;
  previewArea?: React.ReactNode;
  toolbar?: React.ReactNode;
}

const DashboardTemplate = (props: IDashboardTemplateProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>{props.headerContents}</div>
      <div className={styles.body}>
        <div className={styles.previewArea}>{props.previewArea}</div>
        <div className={styles.toolbar}>{props.toolbar}</div>
      </div>
    </div>
  );
};

export { DashboardTemplate };
export type { IDashboardTemplateProps };
