import type { TreeViewInteractionContextValue } from "@/components/TreeView/Contexts/InteractionContext/context";
import type { TreeViewInteractionContextProps } from "@/components/TreeView/Contexts/InteractionContext/props";
import type { TreeNodeId, TreeNodeType } from "@/components/TreeView/types";
import traverseTree from "@/components/TreeView/utils/traverse";
import { useCallback, useMemo, useState } from "react";

export type UseOpenCloseInteractionProps = Pick<
  TreeViewInteractionContextProps,
  "defaultOpenedIds" | "treeData" | "openedIds" | "onToggle"
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
  openedIds: controlledOpenedIds,
  onToggle,
}: UseOpenCloseInteractionProps): UseOpenCloseInteractionOutput => {
  const [internalOpenedIds, setInternalOpenedIds] = useState<Set<TreeNodeId>>(
    new Set(defaultOpenedIds)
  );

  const isControlled = controlledOpenedIds !== undefined;

  const openedIds = useMemo(
    () => (isControlled ? new Set(controlledOpenedIds) : internalOpenedIds),
    [controlledOpenedIds, internalOpenedIds, isControlled]
  );

  const setOpenedIds = useCallback(
    (next: typeof internalOpenedIds) => {
      if (!isControlled) setInternalOpenedIds(next);
    },
    [isControlled]
  );

  const visibleNodes = getVisibleNodes(treeData, openedIds);

  const isOpenedFn = useCallback(
    (id: TreeNodeId) => openedIds.has(id),
    [openedIds]
  );

  const toggleNode = (id: TreeNodeId) => {
    const next = new Set(openedIds);
    const isOpened = next.has(id);
    if (isOpened) next.delete(id);
    else next.add(id);
    setOpenedIds(next);
    onToggle?.(id);
  };

  return {
    openedIds,
    visibleNodes,
    isOpenedFn,
    toggleNode,
  };
};

export default useOpenCloseInteraction;
