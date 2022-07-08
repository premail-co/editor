import React from "react";
import { StateContext } from "./StateContext";

const useStateContext = () => {
  return React.useContext(StateContext);
};

export { useStateContext };
