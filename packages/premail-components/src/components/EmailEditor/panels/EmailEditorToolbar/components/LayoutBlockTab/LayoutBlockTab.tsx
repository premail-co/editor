import React from "react";
import { TabTitleText } from "../TabTitleText/index";
import { TabGroupWrapper } from "../TabGroupWrapper/index";
import { InsertC12Row } from "./components/InsertC12Row";
import { InsertC6C6Row } from "./components/InsertC6C6Row";

const LayoutBlockTab = () => {
  return (
    <TabGroupWrapper>
      <TabTitleText>Blocks</TabTitleText>
      <InsertC12Row />
      <InsertC6C6Row />
    </TabGroupWrapper>
  );
};
export { LayoutBlockTab };
