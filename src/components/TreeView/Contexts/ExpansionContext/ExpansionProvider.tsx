import { useDataContext } from "@/components/TreeView/Contexts/DataContext";
import ExpansionContext from "@/components/TreeView/Contexts/ExpansionContext/ExpansionContext";
import type { ExpansionProviderProps } from "@/components/TreeView/Contexts/ExpansionContext/types/ExpansionProviderProps";
import getVisibleNodes from "@/components/TreeView/Contexts/ExpansionContext/utils/getVisibleNodes";
import type { TreeNodeId } from "@/components/TreeView/types/nodes";
import useControllableSet from "@/lib/hooks/useControllableSet";
import { useCallback } from "react";

const ExpansionProvider = ({
  defaultExpandedIds,
  expandedIds: controlledExpandedIds,
  onExpansionClick,
  children,
}: ExpansionProviderProps) => {
  const { nodes } = useDataContext();
  const [expandedIds, setExpandedIds] = useControllableSet(
    defaultExpandedIds,
    controlledExpandedIds
  );

  const visibleNodes = getVisibleNodes(nodes, expandedIds);

  const isExpandedFn = useCallback(
    (id: TreeNodeId) => expandedIds.has(id),
    [expandedIds]
  );

  const toggleExpansion = (id: TreeNodeId) => {
    const next = new Set(expandedIds);
    let action: "expand" | "collapse" = "expand";
    const isExpanded = next.has(id);

    if (isExpanded) {
      next.delete(id);
      action = "collapse";
    } else {
      next.add(id);
    }

    setExpandedIds(next);
    onExpansionClick?.(id, action);
  };

  return (
    <ExpansionContext.Provider
      value={{
        expandedIds,
        isExpandedFn,
        visibleNodes,
        toggleExpansion,
      }}
    >
      {children}
    </ExpansionContext.Provider>
  );
};

export default ExpansionProvider;
