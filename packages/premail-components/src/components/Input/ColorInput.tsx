import React from "react";
import { Input } from "./index";
import styles from "./ColorInput.module.scss";
import { IOverridable, IStylable } from "../../types/index";
import { concatClassNames } from "../util/concatClassNames";
import { ChromePicker } from "react-color";
import { IInputRef } from "./Input";

interface IColorPreviewProps extends IStylable, IOverridable {
  color?: string;
}

const ColorPreview = (props?: IColorPreviewProps) => {
  return (
    <div
      className={concatClassNames(styles.previewArea, props?.override ?? "")}
      style={props?.style}
    />
  );
};
interface IColorInputProps extends IOverridable {
  id: string;
  color?: string;
  pickerOverride?: string;
}

enum ColorInputStates {
  SELECTED,
  SELECTING,
}

const ColorInput = (props: IColorInputProps) => {
  const [pickerState, setPickerState] = React.useState(
    ColorInputStates.SELECTED
  );
  const [color, setColor] = React.useState<string>(props.color ?? "#FFFFFF");
  const pickerRef = React.useRef<HTMLDivElement | null>(null);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<IInputRef>({ input: null, wrapper: null });
  const pickerClassName = concatClassNames(
    styles.picker,
    pickerState == ColorInputStates.SELECTED ? styles.hiddenPicker : "",
    props.pickerOverride ?? ""
  );

  React.useEffect(() => {
    const elistener = (e: MouseEvent) => {
      if (inputRef.current.wrapper == null || e.target == null) {
        return;
      }
      if (pickerRef.current == null) return;
      if (
        !inputRef.current.wrapper.contains(e.target as HTMLElement) &&
        !pickerRef.current.contains(e.target as HTMLElement)
      ) {
        setPickerState(ColorInputStates.SELECTED);
      }
    };

    const blurlistener = () => {
      setPickerState(ColorInputStates.SELECTED);
    };
    window.addEventListener("click", elistener);
    window.addEventListener("blur", blurlistener);
    return () => {
      window.removeEventListener("click", elistener);
      window.removeEventListener("blur", blurlistener);
    };
  }, [pickerState]);

  React.useEffect(() => {
    const el = (e: KeyboardEvent) => {
      if (
        inputRef.current.wrapper == null ||
        e.target == null ||
        pickerRef.current == null
      ) {
        return;
      }

      if (
        pickerState == ColorInputStates.SELECTING &&
        e.shiftKey &&
        e.key == "Tab"
      ) {
        setPickerState(ColorInputStates.SELECTED);
        return;
      }

      if (
        (pickerState == ColorInputStates.SELECTING &&
          pickerRef.current.contains(document.activeElement) &&
          e.key == "Tab") ||
        e.key == "Escape"
      ) {
        setPickerState(ColorInputStates.SELECTED);
        return;
      }
    };
    document.body.addEventListener("keydown", el);
    return () => {
      document.body.removeEventListener("keydown", el);
    };
  }, [pickerState]);

  const rootClassName = concatClassNames(styles.root, props.override ?? "");

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      onFocus={() => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            setPickerState(ColorInputStates.SELECTING);
          });
        }, 0);
      }}
    >
      <Input
        readOnly
        override={styles.inputOverride}
        id={props.id}
        value={color}
        ref={inputRef}
        iconPosition="end"
        icon={(props) => (
          <ColorPreview {...props} style={{ background: color }} />
        )}
      />
      <div ref={pickerRef} className={pickerClassName}>
        <ChromePicker
          color={color}
          onChangeComplete={() => {}}
          onChange={(e) => {
            setColor(e.hex);
          }}
          className={styles.colorPicker}
        />
      </div>
    </div>
  );
};

export { ColorInput };
export type { IColorInputProps };
