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

const getStylesFromVariant = (variant?: string) => {
  switch (variant) {
    case "primary":
    case "secondary":
    case "plain":
    case "outlined":
    case "danger":
    case "warning":
      return styles[variant];
    default:
      return styles["primary"];
  }
};
const getStylesFromSize = (size?: string) => {
  switch (size) {
    case "small":
    case "medium":
    case "large":
      return styles[size];
    default:
      return styles["medium"];
  }
};
const getStylesFromIconPosition = (
  position?: IButtonProps["iconPosition"],
  icon?: IButtonProps["icon"]
) => {
  if (icon != null && position != null) {
    if (position == "begin") {
      return styles.iconBeginPadding;
    } else {
      return styles.iconEndPadding;
    }
  } else if (icon != null && position == null) {
    return styles.iconBeginPadding;
  } else {
    return "";
  }
};

const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<IButtonProps>
>((props, ref) => {
  const overrideClass = props.override ?? "";
  const variantClass = React.useMemo(
    () => getStylesFromVariant(props.variant),
    [props.variant]
  );
  const sizeClass = React.useMemo(
    () => getStylesFromSize(props.size),
    [props.size]
  );

  const contentPaddingClass = React.useMemo(
    () => getStylesFromIconPosition(props.iconPosition, props.icon),
    [props.iconPosition, props.icon]
  );

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
      {Icon && props.iconPosition != "end" ? Icon : ""}
      {props.children && (
        <span className={contentPaddingClass}>{props.children}</span>
      )}
      {Icon && props.iconPosition == "end" ? Icon : ""}
    </button>
  );
});

export { Button };
export type { IButtonProps };
