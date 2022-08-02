import type { IClickable } from "../../types";

export enum EnumAutoCompleteStates {
  OFF = "OFF",
  SELECTING = "SELECTING",
  SELECTED = "SELECTED",
}

interface IAutoCompleteOption<T> extends IClickable<HTMLElement> {
  id?: string;
  label: string;
  value: T;
  icon?: JSX.Element;
}
export type { IAutoCompleteOption };
