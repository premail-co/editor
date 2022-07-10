import React, { CSSProperties } from "react";
import styles from "./Button.module.scss";
import { IOverridable } from "../../types";
import { concatClassNames } from "../util/concatClassNames";

interface IButtonProps
  extends IOverridable,
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
  variant?:
    | "primary"
    | "secondary"
    | "plain"
    | "outlined"
    | "danger"
    | "warning";
  icon?: React.FunctionComponent<{
    style?: CSSProperties;
    className?: string;
  }>;
  iconPosition?: "begin" | "end";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
}

const getHTMLButtonProps = (
  props: IButtonProps
): Omit<IButtonProps, "variant" | "icon" | "iconPosition" | "size"> => {
  const HTMLButtonProps = Object.assign({}, props);
  delete HTMLButtonProps.variant;
  delete HTMLButtonProps.icon;
  delete HTMLButtonProps.iconPosition;
  delete HTMLButtonProps.size;
  return HTMLButtonProps;
};

const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<IButtonProps>
>((props, ref) => {
  const overrideClass = props.override ?? "";
  const variant = props.variant ?? "primary";
  const variantClass = styles[variant] ?? styles.primary;
  const size = props.size ?? "medium";
  const sizeClass = styles[size] ?? styles.medium;

  const iconPosition =
    props.icon != null && props.iconPosition != null
      ? props.iconPosition
      : props.icon != null && props.iconPosition == null
      ? "begin"
      : null;

  const contentPaddingClass =
    iconPosition == "begin"
      ? styles.iconBeginPadding
      : iconPosition == "end"
      ? styles.iconEndPadding
      : "";

  const Icon = React.useMemo(() => {
    return props.icon ? <props.icon className={styles.icon} /> : null;
  }, [props.icon]);

  const className = React.useMemo(
    () => concatClassNames(styles.root, sizeClass, variantClass, overrideClass),
    [sizeClass, variantClass, overrideClass]
  );
  const HTMLButtonProps = getHTMLButtonProps(props);

  return (
    <button className={className} ref={ref} {...HTMLButtonProps}>
      {Icon && iconPosition == "begin" ? Icon : ""}
      {props.children && (
        <span className={contentPaddingClass}>{props.children}</span>
      )}
      {Icon && iconPosition == "end" ? Icon : ""}
    </button>
  );
});

export { Button };
export type { IButtonProps };
