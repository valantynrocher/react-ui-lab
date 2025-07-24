import { useNormalizedTree } from "@/components/TreeView/hooks/useNormalizedTree";
import DataContext from "../DataContext";
import type { DataProviderInternalDataProps } from "../types/DataContextProviderProps";

const DataProviderInternalData = ({
  nodes,
  children,
}: DataProviderInternalDataProps) => {
  const [internalNodes] = useNormalizedTree(nodes);

  return (
    <DataContext.Provider value={{ nodes: internalNodes }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProviderInternalData;
