import { useCallback, useState } from "react";

const useControlledState = <T>(
  defaultValue: T,
  controlledValue: T | undefined,
  onChange?: (value: T) => void
): [T, (value: T) => void] => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [value, setValue];
};

export default useControlledState;
