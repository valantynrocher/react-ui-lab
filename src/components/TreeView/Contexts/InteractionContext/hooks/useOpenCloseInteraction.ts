import type { TreeViewInteractionContextValue } from "@/components/TreeView/Contexts/InteractionContext/context";
import type { TreeViewInteractionContextProps } from "@/components/TreeView/Contexts/InteractionContext/props";
import type { TreeNodeId, TreeNodeType } from "@/components/TreeView/types";
import traverseTree from "@/components/TreeView/utils/traverse";
import { useCallback, useState } from "react";

export type UseOpenCloseInteractionProps = Pick<
  TreeViewInteractionContextProps,
  "defaultOpenedIds" | "treeData"
>;

export type UseOpenCloseInteractionOutput = Pick<
  TreeViewInteractionContextValue,
  "openedIds" | "visibleNodes" | "isOpenedFn" | "toggleNode"
>;

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
  defaultOpenedIds,
}: UseOpenCloseInteractionProps): UseOpenCloseInteractionOutput => {
  const [openedIds, setOpenedIds] = useState<Set<TreeNodeId>>(
    new Set(defaultOpenedIds)
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
    openedIds,
    visibleNodes,
    isOpenedFn,
    toggleNode,
  };
};

export default useOpenCloseInteraction;
