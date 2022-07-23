import React from "react";
import { IObservable } from "../state/Observable";
import { createObserver } from "../state/Observer";

const useObservable = <T>(
  observable: IObservable<T> | null
): [T | null, (arg: T) => void] => {
  const [observableState, setObservableState] =
    React.useState<IObservable<T> | null>(null);
  const [observableValue, setObservableValue] = React.useState(
    observableState && observableState.getValue()
  );

  React.useEffect(() => {
    setObservableState(observable ?? null);
    setObservableValue(observable?.getValue() ?? null);
  }, [observable]);

  React.useEffect(() => {
    if (observableState == null) {
      return;
    }
    const observer = createObserver<T>((next) => {
      setObservableValue(next);
    });
    observableState.subscribe(observer);

    return () => {
      observableState.unsubscribe(observer.id);
      observer.instance.clearCallback();
    };
  }, [observableState]);

  const observableUpdateCallback = React.useCallback(
    (next: T) => {
      if (observableState == null) {
        return;
      }
      observableState.setValue(next);
      observableState.notify();
    },
    [observableState]
  );

  return [observableValue, observableUpdateCallback];
};

export { useObservable };
