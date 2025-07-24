import SelectionContext from "../SelectionContext";
import { useContext } from "react";

const useSelectionContext = () => {
  const context = useContext(SelectionContext);
  if (!context)
    throw new Error(
      "useSelectionContext must be used within a SelectionProvider"
    );
  return context;
};

export default useSelectionContext;
