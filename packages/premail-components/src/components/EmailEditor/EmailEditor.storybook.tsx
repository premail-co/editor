import React from "react";
import { EmailEditor } from "./EmailEditor";

// This default export determines where you story goes in the story list
export default {
  title: "EmailEditor",
  component: EmailEditor,
};

export const Overview = () => {
  return <EmailEditor />;
};
