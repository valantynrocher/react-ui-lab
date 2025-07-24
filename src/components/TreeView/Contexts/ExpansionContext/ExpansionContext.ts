import type { ExpansionContextType } from "@/components/TreeView/Contexts/ExpansionContext/types/ExpansionContextType";
import { createContext } from "react";

const ExpansionContext = createContext<ExpansionContextType | null>(null);

export default ExpansionContext;
