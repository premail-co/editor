import React from "react";
import { TabTitleText } from "../TabTitleText/index";
import { TabGroupWrapper } from "../TabGroupWrapper/index";
import styles from "./LayoutBlockTab.module.scss";

const Row = (props: React.PropsWithChildren<{}>) => {
  return <div className={styles.row}>{props.children}</div>;
};
const VisibleCol = (
  props: React.PropsWithChildren<{
    colWidth:
      | "visibleColFull"
      | "visibleColHalf"
      | "visibleColQuarter"
      | "visibleCol3Quarter";
  }>
) => {
  return React.useMemo(
    () => <div className={styles[props.colWidth]}>{props.children}</div>,
    [props.colWidth, props.children]
  );
};

const LayoutBlockTab = () => {
  return (
    <TabGroupWrapper>
      <TabTitleText>Blocks</TabTitleText>

      <Row>
        <VisibleCol colWidth="visibleColFull" />
      </Row>

      <Row>
        <VisibleCol colWidth="visibleColHalf" />
        <VisibleCol colWidth="visibleColHalf" />
      </Row>

      <Row>
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleCol3Quarter" />
      </Row>

      <Row>
        <VisibleCol colWidth="visibleCol3Quarter" />
        <VisibleCol colWidth="visibleColQuarter" />
      </Row>

      <Row>
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleColQuarter" />
      </Row>
      <Row>
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleColHalf" />
        <VisibleCol colWidth="visibleColQuarter" />
      </Row>

      <Row>
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleColHalf" />
      </Row>

      <Row>
        <VisibleCol colWidth="visibleColHalf" />
        <VisibleCol colWidth="visibleColQuarter" />
        <VisibleCol colWidth="visibleColQuarter" />
      </Row>
    </TabGroupWrapper>
  );
};
export { LayoutBlockTab };
