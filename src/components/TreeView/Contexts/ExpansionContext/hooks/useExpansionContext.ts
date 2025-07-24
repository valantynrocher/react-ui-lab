import ExpansionContext from "../ExpansionContext";
import { useContext } from "react";

const useExpansionContext = () => {
  const context = useContext(ExpansionContext);
  if (!context)
    throw new Error(
      "useExpansionContext must be used within a ExpansionProvider"
    );
  return context;
};

export default useExpansionContext;
