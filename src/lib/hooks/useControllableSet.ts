import { useCallback, useState } from "react";

const useControllableSet = <T>(
  defaultValue?: T[],
  controlledValue?: T[]
): [Set<T>, (value: Set<T>) => void] => {
  const [internalState, setInternalState] = useState<Set<T>>(
    new Set(defaultValue)
  );

  const isControlled = controlledValue !== undefined;
  const state = isControlled ? new Set(controlledValue) : internalState;

  const setState = useCallback(
    (next: typeof internalState) => {
      if (!isControlled) setInternalState(next);
    },
    [isControlled]
  );

  return [state, setState];
};

export default useControllableSet;
