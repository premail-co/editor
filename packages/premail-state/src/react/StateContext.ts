import React from "react";
import { IStateContext } from "./types";

const defaultValues: IStateContext = {
  instanceManager: null,
};

const StateContext = React.createContext(defaultValues);

export { StateContext, defaultValues };
