import type { DataContextType } from "@/components/TreeView/Contexts/DataContext/types/DataContextType";
import { createContext } from "react";

const DataContext = createContext<DataContextType | null>(null);

export default DataContext;
