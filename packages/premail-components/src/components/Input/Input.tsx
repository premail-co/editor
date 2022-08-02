import React, { CSSProperties } from "react";
import styles from "./Input.module.scss";
import type { IOverridable } from "../../types";
import { concatClassNames } from "../util/concatClassNames";

type InputSupportedType =
  | "text"
  | "number"
  | "file"
  | "email"
  | "date"
  | "tel"
  | "password"
  | "color";

interface IInputProps extends IOverridable, React.HTMLProps<HTMLInputElement> {
  readonly type?: InputSupportedType;
  readonly placeholder?: string;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly onFocus?: React.FocusEventHandler<HTMLInputElement>;
  readonly onFocusCapture?: React.FocusEventHandler<HTMLInputElement>;
  readonly onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readonly id: string;
  readonly autocomplete?: string;
  readonly value?: string | number;
  readonly role?: string;
  readonly accept?: string;
  readonly min?: number | string;
  readonly max?: number | string;

  readonly error?: boolean;
  readonly helperText?: string | null;
  readonly icon?: React.FunctionComponent<{
    style?: CSSProperties;
    className?: string;
  }>;
  readonly iconPosition?: "begin" | "end";
}

interface IInputRef {
  wrapper: HTMLLabelElement | null;
  input: HTMLInputElement | null;
}

const Input = React.memo(
  React.forwardRef<IInputRef, IInputProps>((props, ref) => {
    const wrapperRef = React.useRef<HTMLLabelElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    React.useImperativeHandle(ref, () => ({
      get wrapper() {
        return wrapperRef.current;
      },
      get input() {
        return inputRef.current;
      },
    }));
    const inputDisabled = Boolean(props.disabled);
    const overrideClassName = props.override ?? "";
    const disabledClassName = inputDisabled ? styles.rootDisabled : "";
    const errorClassName =
      inputDisabled == false && props.error ? styles.rootError : "";
    const helperTextStyles = props.helperText ? styles.rootHelperText : "";

    const Icon = React.useMemo(() => {
      return props.icon ? <props.icon className={styles.icon} /> : null;
    }, [props.icon]);

    const labelClassName = concatClassNames(
      styles.root,
      overrideClassName,
      disabledClassName,
      errorClassName,
      helperTextStyles
    );

    return (
      <label
        className={labelClassName}
        style={props.style}
        htmlFor={props.id}
        ref={wrapperRef}
        aria-label={props["aria-label"]}
        data-content={props.helperText}
      >
        {props.icon && props.iconPosition != "end" ? Icon : ""}
        <input
          ref={inputRef}
          className={styles.input}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onFocusCapture={props.onFocusCapture}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onClick={props.onClick}
          autoComplete={props.autocomplete}
          id={props.id}
          role={props.role}
          aria-autocomplete={props["aria-autocomplete"]}
          aria-haspopup={props["aria-haspopup"]}
          aria-owns={props["aria-owns"]}
          aria-expanded={props["aria-expanded"]}
          aria-activedescendant={props["aria-activedescendant"]}
          readOnly={props.readOnly}
          disabled={props.disabled}
          accept={props.accept}
          min={props.min}
          max={props.max}
        />
        {props.icon && props.iconPosition == "end" ? Icon : ""}
      </label>
    );
  })
);
export { Input };
export type { IInputProps, InputSupportedType, IInputRef };
