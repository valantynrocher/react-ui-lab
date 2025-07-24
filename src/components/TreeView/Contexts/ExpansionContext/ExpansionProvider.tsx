import { useDataContext } from "@/components/TreeView/Contexts/DataContext";
import ExpansionContext from "@/components/TreeView/Contexts/ExpansionContext/ExpansionContext";
import type { ExpansionProviderProps } from "@/components/TreeView/Contexts/ExpansionContext/types/ExpansionProviderProps";
import getVisibleNodes from "@/components/TreeView/Contexts/ExpansionContext/utils/getVisibleNodes";
import type { TreeNodeId } from "@/components/TreeView/types/nodes";
import { useCallback, useMemo, useState } from "react";

const ExpansionProvider = ({
  defaultExpandedIds,
  expandedIds: controlledExpandedIds,
  onExpansionClick,
  children,
}: ExpansionProviderProps) => {
  const { nodes } = useDataContext();
  const [internalExpandedIds, setInternalExpandedIds] = useState<
    Set<TreeNodeId>
  >(new Set(defaultExpandedIds));

  const isControlled = controlledExpandedIds !== undefined;

  const expandedIds = useMemo(
    () => (isControlled ? new Set(controlledExpandedIds) : internalExpandedIds),
    [controlledExpandedIds, internalExpandedIds, isControlled]
  );

  const setOpenedIds = useCallback(
    (next: typeof internalExpandedIds) => {
      if (!isControlled) setInternalExpandedIds(next);
    },
    [isControlled]
  );

  const visibleNodes = getVisibleNodes(nodes, expandedIds);

  const isExpandedFn = useCallback(
    (id: TreeNodeId) => expandedIds.has(id),
    [expandedIds]
  );

  const toggleExpansion = (id: TreeNodeId) => {
    const next = new Set(expandedIds);
    let action: "expand" | "collapse" = "expand";
    const isOpened = next.has(id);

    if (isOpened) {
      next.delete(id);
      action = "collapse";
    } else {
      next.add(id);
    }

    setOpenedIds(next);
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
