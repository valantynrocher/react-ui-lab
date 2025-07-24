import type { CustomizationContextType } from "@/components/TreeView/Contexts/CustomizationContext/types/CustomizationContextType";
import { createContext } from "react";

const CustomizationContext = createContext<CustomizationContextType | null>(
  null
);

export default CustomizationContext;
