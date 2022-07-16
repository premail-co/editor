import React from "react";
import { Button } from "../Button/Button";
import { ButtonGroup } from "../Button/ButtonGroup";
import { DashboardTemplate } from "./DashboardTemplate";

// This default export determines where you story goes in the story list
export default {
  title: "DashboardTemplate",
  component: DashboardTemplate,
};

export const Overview = () => {
  return (
    <DashboardTemplate
      headerContents={
        <ButtonGroup outline={false}>
          <Button>File</Button>
          <Button>Undo</Button>
          <Button>Redo</Button>
          <Button variant="secondary">Export</Button>
        </ButtonGroup>
      }
    />
  );
};
