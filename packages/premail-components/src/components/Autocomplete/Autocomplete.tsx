import React, { ChangeEvent } from "react";
import { Chevron } from "@premail/icons";
import AutocompletePane from "./AutocompletePane";
import { Surface } from "../Surface";
import { Input } from "../Input";
import {
  EnumAutoCompleteStates,
  IAutoCompleteOption,
} from "./Autocomplete.types";
import type {
  IFocusable,
  IChangeable,
  IAriaLabel,
  IOverridable,
} from "../../types";
import styles from "./Autocomplete.module.scss";
import { IInputRef } from "../Input/Input";
import { concatClassNames } from "../util/concatClassNames";

interface AutocompleteProps<T extends unknown>
  extends IFocusable<HTMLInputElement>,
    IChangeable<HTMLInputElement>,
    IAriaLabel,
    IOverridable {
  options: Array<IAutoCompleteOption<T>>;
  selectedOption: IAutoCompleteOption<T> | null;
  onSelection?: (option: IAutoCompleteOption<T> | null) => void;
  id: string;
  disabled?: boolean;
  placeholder?: string;
  noMatchLabel: string;
  error?: boolean;
  helperText?: string | null;
}

const filterOptions = <T extends unknown>(
  allOptions: Array<IAutoCompleteOption<T>>,
  bufferText: string
): Array<IAutoCompleteOption<T>> => {
  return allOptions.filter((option) => {
    return option.label.toLocaleLowerCase().includes(bufferText.toLowerCase());
  });
};

interface IAutocompleteState<T> {
  textBuffer: string;
  selectedOption: IAutoCompleteOption<T> | null;
  focusState: EnumAutoCompleteStates;
  paneFocusIndex: number;
  paneIsOpen: boolean;
}

interface TransitionFocusSelectingAction {
  type: "transition-focus-selecting";
}

interface TransitionFocusOffAction {
  type: "transition-focus-off";
}

interface TransitionFocusSelectedAction<T> {
  type: "transition-focus-selected";
  args: IAutoCompleteOption<T> | null;
}

interface UpdateBufferAction {
  type: "update-buffer";
  args: string;
}

interface UpdatePaneFocusIndexAction {
  type: "update-pane-focus-index";
  args: number;
}

interface SelectedOptionPropChangeAction<T> {
  type: "selected-option-prop-change";
  args: IAutoCompleteOption<T> | null;
}

type AutocompleteActions<T> =
  | TransitionFocusSelectingAction
  | UpdateBufferAction
  | UpdatePaneFocusIndexAction
  | TransitionFocusSelectedAction<T>
  | TransitionFocusOffAction
  | SelectedOptionPropChangeAction<T>;

const reducer = <T,>(
  state: IAutocompleteState<T>,
  action: AutocompleteActions<T>
): IAutocompleteState<T> => {
  switch (action.type) {
    case "transition-focus-selecting":
      if (state.focusState == EnumAutoCompleteStates.SELECTING) {
        return state;
      }

      return {
        textBuffer: "",
        paneIsOpen: true,
        paneFocusIndex: -1,
        selectedOption: null,
        focusState: EnumAutoCompleteStates.SELECTING,
      };
    case "transition-focus-selected":
      if (
        state.focusState == EnumAutoCompleteStates.SELECTED ||
        state.focusState == EnumAutoCompleteStates.OFF
      ) {
        return state;
      }
      return {
        textBuffer: action.args?.label ?? "",
        paneIsOpen: false,
        paneFocusIndex: -1,
        selectedOption: action.args,
        focusState: EnumAutoCompleteStates.SELECTED,
      };

    case "transition-focus-off":
      if (state.focusState == EnumAutoCompleteStates.OFF) {
        return state;
      }

      return {
        textBuffer:
          state.focusState == EnumAutoCompleteStates.SELECTING
            ? ""
            : state.textBuffer,
        paneIsOpen: false,
        paneFocusIndex: -1,
        selectedOption:
          state.focusState == EnumAutoCompleteStates.SELECTING
            ? null
            : state.selectedOption,
        focusState: EnumAutoCompleteStates.OFF,
      };
    case "update-buffer":
      return {
        ...state,
        textBuffer: action.args,
      };
    case "update-pane-focus-index":
      return { ...state, paneFocusIndex: action.args };

    case "selected-option-prop-change":
      return {
        ...state,
        textBuffer: action.args?.label ?? "",
        paneIsOpen: state.paneIsOpen,
        paneFocusIndex: -1,
        selectedOption: action.args,
      };
  }
};

const createSelectingTransitionAction = (): TransitionFocusSelectingAction => {
  return { type: "transition-focus-selecting" };
};

const createOffTransitionAction = (): TransitionFocusOffAction => {
  return { type: "transition-focus-off" };
};

const createSelectedTransitionAction = <T,>(
  args: IAutoCompleteOption<T>
): TransitionFocusSelectedAction<T> => {
  return { type: "transition-focus-selected", args };
};

const createUpdateBufferAction = (args: string): UpdateBufferAction => {
  return { type: "update-buffer", args };
};

const createUpdatePaneFocuseIndexAction = (
  args: number
): UpdatePaneFocusIndexAction => {
  return { type: "update-pane-focus-index", args };
};

const createSelectedOptionPropChangeAction = <T,>(
  args: IAutoCompleteOption<T> | null
): SelectedOptionPropChangeAction<T> => {
  return { type: "selected-option-prop-change", args };
};
const Autocomplete = <T extends unknown>(props: AutocompleteProps<T>) => {
  const rootNode = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<IInputRef>({ input: null, wrapper: null });

  const [state, dispatch] = React.useReducer(reducer, {
    textBuffer: props.selectedOption?.label ?? "",
    selectedOption: props.selectedOption ?? null,
    focusState: EnumAutoCompleteStates.OFF,
    paneFocusIndex: -1,
    paneIsOpen: false,
  });

  const overrideClassName = concatClassNames(styles.root, props.override ?? "");

  const filteredOptions: IAutoCompleteOption<T>[] = React.useMemo(
    () => filterOptions(props.options, state.textBuffer ?? ""),
    [props.options, state.textBuffer]
  );

  const onAutocompleteFocus = React.useCallback(() => {
    dispatch(createSelectingTransitionAction());
    if (state.focusState == EnumAutoCompleteStates.SELECTED) {
      props.onSelection && props.onSelection(null);
    }
  }, [state.selectedOption, props.onSelection]);

  const onInputChange = React.useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (state.focusState != EnumAutoCompleteStates.SELECTING) {
        dispatch(createSelectingTransitionAction());
      }

      dispatch(createUpdateBufferAction(e.target.value));
      dispatch(createUpdatePaneFocuseIndexAction(-1));
    },
    [state.focusState]
  );
  const onOptionSelected = React.useCallback(
    (val: IAutoCompleteOption<T>) => {
      dispatch(createSelectedTransitionAction(val));
      props.onSelection && props.onSelection(val);
    },
    [props.onSelection]
  );

  React.useEffect(() => {
    const onClickOut = (e: MouseEvent) => {
      const root = rootNode.current;
      // type assertion is inevitable as  EventTarget is the most generic type
      const target = e.target as Node | null;
      if (e.target == null || root == null) {
        return;
      }
      if (root.contains(target) == false) {
        dispatch(createOffTransitionAction());
      }
    };
    const onWindowBlur = () => {
      dispatch(createOffTransitionAction());
    };

    window.addEventListener("blur", onWindowBlur);
    window.addEventListener("click", onClickOut);
    return () => {
      window.removeEventListener("blur", onWindowBlur);
      window.removeEventListener("click", onClickOut);
    };
  }, []);
  React.useEffect(() => {
    const kb = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
          // Do something for "down arrow" key press.
          if (state.focusState == EnumAutoCompleteStates.SELECTING) {
            e.preventDefault();

            if (state.paneFocusIndex == filteredOptions.length - 1) {
              dispatch(createUpdatePaneFocuseIndexAction(-1));
            } else {
              dispatch(
                createUpdatePaneFocuseIndexAction(
                  Math.min(state.paneFocusIndex + 1, filteredOptions.length - 1)
                )
              );
            }
          }

          break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
          // Do something for "up arrow" key press.
          if (state.focusState == EnumAutoCompleteStates.SELECTING) {
            e.preventDefault();

            if (state.paneFocusIndex == -1) {
              dispatch(
                createUpdatePaneFocuseIndexAction(filteredOptions.length - 1)
              );
            } else {
              dispatch(
                createUpdatePaneFocuseIndexAction(
                  Math.max(state.paneFocusIndex - 1, -1)
                )
              );
            }
          }
          break;

        case "Enter":
          e.preventDefault();
          // Do something for "enter" or "return" key press.
          if (
            state.paneFocusIndex > -1 &&
            state.focusState == EnumAutoCompleteStates.SELECTING
          ) {
            dispatch(
              createSelectedTransitionAction(
                filteredOptions[state.paneFocusIndex]
              )
            );
            props.onSelection &&
              props.onSelection(filteredOptions[state.paneFocusIndex]);
          }
          break;

        case "Tab": // IE/Edge specific value
          dispatch(createOffTransitionAction());

          break;
      }
    };

    const input = inputRef.current.input;
    if (input) {
      input.addEventListener("keydown", kb);
    }

    return () => {
      if (input) {
        input.removeEventListener("keydown", kb);
      }
    };
  }, [
    state.paneFocusIndex,
    state.focusState,
    filteredOptions,
    props.onSelection,
  ]);

  const previousSelectedOptionProp =
    React.useRef<IAutoCompleteOption<T> | null>(null);
  const previousOptions = React.useRef<IAutoCompleteOption<T>[] | null>(null);

  React.useEffect(() => {
    const optDiff =
      JSON.stringify({ data: props.options }) !=
      JSON.stringify({ data: previousOptions.current });

    if (previousSelectedOptionProp.current != props.selectedOption || optDiff) {
      dispatch(createSelectedOptionPropChangeAction(props.selectedOption));
    }
    previousSelectedOptionProp.current = props.selectedOption;
    previousOptions.current = props.options;
  }, [props.selectedOption, previousSelectedOptionProp.current, props.options]);

  const paneClassNames = concatClassNames(
    styles.paneContainer,
    state.paneIsOpen ? styles.paneExpanded : "",
    props.helperText != null ? styles.paneContainerShifted : ""
  );

  return (
    <span className={overrideClassName} ref={rootNode}>
      <Input
        type="text"
        id={props.id}
        icon={Chevron}
        iconPosition={"end"}
        override={styles.inputOverride}
        onFocus={onAutocompleteFocus}
        onChange={onInputChange}
        placeholder={props.placeholder}
        autocomplete={"off"}
        ref={inputRef}
        value={state.textBuffer}
        role={"combobox"}
        aria-autocomplete="list"
        aria-haspopup="true"
        aria-expanded={
          state.focusState == EnumAutoCompleteStates.SELECTING
            ? "true"
            : "false"
        }
        aria-owns={`${props.id}-pane`}
        aria-activedescendant={
          filteredOptions[state.paneFocusIndex]
            ? `${filteredOptions[state.paneFocusIndex].label} - ${
                filteredOptions[state.paneFocusIndex].value
              }`
            : undefined
        }
        aria-label={props["aria-label"]}
        disabled={props.disabled}
        helperText={props.helperText}
        error={props.error}
      />
      <Surface override={paneClassNames} elevation={"elevation-2"}>
        <AutocompletePane<T>
          options={filteredOptions}
          onSelection={onOptionSelected}
          textBuffer={state.textBuffer}
          focusedIndex={state.paneFocusIndex}
          id={`${props.id}-pane`}
          aria-label={props["aria-label"]}
          noMatchLabel={props.noMatchLabel}
        />
      </Surface>
    </span>
  );
};
export { Autocomplete };
export type { AutocompleteProps };
