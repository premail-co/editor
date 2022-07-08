import React from "react";
import { IStateContext } from "./types";

const defaultValues: IStateContext = {
  storeRegisty: null,
};

const StateContext = React.createContext(defaultValues);

export { StateContext, defaultValues };
