import type { TreeNodeId } from "@/components/TreeView/types";
import { useCallback, useState } from "react";

export interface UseExpandedReturn {
  expandedIds: Set<TreeNodeId>;
  isExpanded: (id: TreeNodeId) => boolean;
  toggle: (id: TreeNodeId) => void;
}

const useExpanded = (initialState: TreeNodeId[] = []): UseExpandedReturn => {
  const [expandedIds, setExpandedIdsState] = useState<Set<TreeNodeId>>(
    new Set(initialState)
  );

  const isExpanded = useCallback(
    (id: TreeNodeId) => expandedIds.has(id),
    [expandedIds]
  );

  const toggle = useCallback((id: TreeNodeId) => {
    setExpandedIdsState((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return {
    expandedIds,
    isExpanded,
    toggle,
  };
};

export default useExpanded;
