import type { DataProviderProps } from "@/components/TreeView/Contexts/DataContext/types/DataContextProviderProps";
import useNormalizedNodes from "@/components/TreeView/hooks/useNormalizedNodes";
import DataContext from "./DataContext";

function DataProvider({ children, ...rest }: DataProviderProps) {
  const nodes = useNormalizedNodes(rest);
  return (
    <DataContext.Provider value={{ nodes }}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
