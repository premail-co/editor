import React from "react";
import type { IAutoCompleteOption } from "./Autocomplete.types";
import type { IIdentifiable, IAriaLabel } from "../../types";
import styles from "./AutocompletePane.module.scss";

interface AutocompletePaneProps<T> extends IIdentifiable, IAriaLabel {
  options: Array<IAutoCompleteOption<T>>;
  onSelection?: (selection: IAutoCompleteOption<T>) => void;
  textBuffer?: string;
  focusedIndex?: number;
  noMatchLabel: string;
}

const AutocompletePane = <T extends unknown>(
  props: AutocompletePaneProps<T>
) => {
  const refs = props.options.map(() => {
    return React.createRef<HTMLLIElement>();
  });

  React.useLayoutEffect(() => {
    const focusIndex = props.focusedIndex;
    if (focusIndex == null) return;
    const el =
      refs[Math.max(0, Math.min(props.options.length - 1, focusIndex))];
    if (el != null && el.current != null) {
      el.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [props.focusedIndex]);
  return (
    <ul
      className={styles.root}
      id={props.id}
      role={"listbox"}
      tabIndex={-1}
      aria-label={`${props.options.length} combobox options available`}
    >
      {props.options.length ? (
        props.options.map((option, i) => {
          return (
            <li
              id={`${option.label} - ${option.value}`}
              role={"option"}
              ref={refs[i]}
              aria-selected={props.focusedIndex == i ? "true" : "false"}
              key={`key ${i} ${option.label}`}
              className={`${styles.listElement} ${
                props.focusedIndex == i ? styles.listElementFocused : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (option.onClick != null) {
                  option.onClick(e);
                }

                if (props.onSelection != null) {
                  props.onSelection(option);
                }
              }}
            >
              {option.icon && option.icon}
              <span className={styles.listElementWrapper}>{option.label}</span>
            </li>
          );
        })
      ) : (
        <span className={`${styles.listElement} ${styles.noMatch}`}>
          <span className={styles.listElementWrapper}>
            {props.noMatchLabel}
          </span>
        </span>
      )}
    </ul>
  );
};
export default AutocompletePane;
export type { AutocompletePaneProps };
