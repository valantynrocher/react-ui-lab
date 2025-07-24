import KeyboardContext from "../KeyboardContext";
import { useContext } from "react";

const useKeyboardContext = () => {
  const context = useContext(KeyboardContext);
  if (!context)
    throw new Error(
      "useKeyboardContext must be used within a KeyboardProvider"
    );
  return context;
};

export default useKeyboardContext;
