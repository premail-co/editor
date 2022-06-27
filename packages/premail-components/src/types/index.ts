import React from "react";
export type WithStyleOverride<T> = T & {
  style?: React.CSSProperties;
};
export type WithChildren<T> = T & {
  children?: React.ReactNode;
};

export type WithClassOverride<T> = T & {
  override?: string;
};

export type WithOverrides<T> = WithStyleOverride<WithClassOverride<T>>;

export type Theme = { name: string; values: { [key: string]: string } };

export interface IClickable<V> {
  onClick?: React.MouseEventHandler<V>;
}

export interface IMouseHoverable<T> {
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
}

export interface IChangeable<V> {
  onChange?: React.ChangeEventHandler<V>;
}

export interface IFocusable<V> {
  onFocus?: React.FocusEventHandler<V>;
  onBlur?: React.FocusEventHandler<V>;
  onFocusCapture?: React.FocusEventHandler<V>;
}

export interface IAriaCombobox {
  ["role"]?: string;
  ["aria-autocomplete"]?: React.AriaAttributes["aria-autocomplete"];
  ["aria-haspopup"]?: React.AriaAttributes["aria-haspopup"];
  ["aria-owns"]?: React.AriaAttributes["aria-owns"];
  ["aria-expanded"]?: React.AriaAttributes["aria-expanded"];
  ["aria-activedescendant"]?: React.AriaAttributes["aria-activedescendant"];
}

export interface IAriaHidden {
  ["aria-hidden"]?: React.AriaAttributes["aria-hidden"];
}

export interface IAriaLabel {
  ["aria-label"]?: React.AriaAttributes["aria-label"];
}

export interface IOverridable {
  override?: string;
}
export interface IStylable {
  style?: React.CSSProperties;
}

export interface IDisabledState {
  disabled?: boolean;
}

export interface IIdentifiable {
  id?: string;
}

export interface IIdentifiableRequired {
  id: string;
}

export interface IButton {
  disabled?: boolean;
  title?: string;
}

export interface IReadOnly {
  readOnly?: boolean;
}

export interface IWithChildren {
  children?: React.ReactNode;
}

export interface ITabIndex {
  tabIndex?: number;
}

export type Maybe<T> = T | null | undefined;
