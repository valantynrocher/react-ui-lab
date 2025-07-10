import type { TreeNodeId } from "@/components/TreeView/types";
import { useState, useCallback } from "react";

export interface UseSelectedReturn {
  select: (id: TreeNodeId) => void;
  isSelected: (id: TreeNodeId) => boolean;
}

const useSelected = (
  initialState: TreeNodeId | null = null
): UseSelectedReturn => {
  const [selected, setSelected] = useState<TreeNodeId | null>(initialState);

  const select = useCallback((id: TreeNodeId) => {
    setSelected(id);
  }, []);

  const isSelected = useCallback(
    (id: TreeNodeId) => selected === id,
    [selected]
  );

  return {
    select,
    isSelected,
  };
};

export default useSelected;
