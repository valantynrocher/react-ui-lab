import DataContext from "../DataContext";
import type { DataProviderExternalDataProps } from "@/components/TreeView/Contexts/DataContext/types/DataContextProviderProps";
import { useNormalizedTree } from "@/components/TreeView/hooks/useNormalizedTree";

function DataProviderExternalData<Node>({
  nodes,
  mapToInternal,
  children,
}: DataProviderExternalDataProps<Node>) {
  const [internalNodes] = useNormalizedTree(nodes, mapToInternal);
  return (
    <DataContext.Provider value={{ nodes: internalNodes }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProviderExternalData;
