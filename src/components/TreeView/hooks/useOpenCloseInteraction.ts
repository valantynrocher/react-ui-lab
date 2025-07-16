import type { TreeNodeId, TreeNodeType } from "@/components/TreeView/types";
import { useCallback, useState } from "react";
import traverseTree from "@/components/TreeView/utils/traverse";

export interface UseOpenCloseInteractionProps {
  treeData: TreeNodeType[];
  initialState?: TreeNodeId[];
}

export type UseOpenCloseInteractionOutput = {
  openedIds: Set<TreeNodeId>;
  visibleNodes: TreeNodeType[];
  isOpenedFn: (id: TreeNodeId) => boolean;
  toggleNode: (id: TreeNodeId) => void;
};

const getVisibleNodes = (
  treeData: TreeNodeType[],
  openedIds: Set<TreeNodeId>
): TreeNodeType[] => {
  const visibleNodes: TreeNodeType[] = [];

  traverseTree<TreeNodeType>(treeData, (node, parent) => {
    // Only add node if it's a root or its parent is expanded
    const isVisible = !parent || openedIds.has(parent.id);
    if (isVisible) {
      visibleNodes.push(node);
    }
  });

  return visibleNodes;
};

const useOpenCloseInteraction = ({
  treeData,
  initialState,
}: UseOpenCloseInteractionProps): UseOpenCloseInteractionOutput => {
  const [openedIds, setOpenedIds] = useState<Set<TreeNodeId>>(
    new Set(initialState)
  );

  const visibleNodes = getVisibleNodes(treeData, openedIds);

  const isOpenedFn = useCallback(
    (id: TreeNodeId) => openedIds.has(id),
    [openedIds]
  );

  const toggleNode = (id: TreeNodeId) => {
    setOpenedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return {
    openedIds: openedIds,
    visibleNodes,
    isOpenedFn,
    toggleNode,
  };
};

export default useOpenCloseInteraction;
