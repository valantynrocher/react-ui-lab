import type { SelectionContextType } from "@/components/TreeView/Contexts/SelectionContext/types/SelectionContextType";
import { createContext } from "react";

const SelectionContext = createContext<SelectionContextType | null>(null);

export default SelectionContext;
