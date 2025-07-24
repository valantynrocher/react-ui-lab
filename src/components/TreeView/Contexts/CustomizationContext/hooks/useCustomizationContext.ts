import CustomizationContext from "../CustomizationContext";
import { useContext } from "react";

const useCustomizationContext = () => {
  const context = useContext(CustomizationContext);
  if (!context)
    throw new Error(
      "useCustomizationContext must be used within a CustomizationProvider"
    );
  return context;
};

export default useCustomizationContext;
