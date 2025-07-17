import type { UseOpenCloseInteractionOutput } from "@/components/TreeView/hooks/useOpenCloseInteraction";
import type { TreeViewProps } from "@/components/TreeView/props";
import type { TreeNodeId } from "@/components/TreeView/types";
import isAllowedEventKey, {
  type AllowedEventKeys,
} from "@/components/TreeView/utils/AllowedEventKeys";
import { useCallback, useState } from "react";

export type UseKeyboardInteractionProps = Pick<
  UseOpenCloseInteractionOutput,
  "toggleNode" | "visibleNodes" | "openedIds"
> &
  Pick<TreeViewProps, "initialSelectedId">;

export type UseKeyboardInteractionOutput = {
  isSelectedFn: (id: TreeNodeId) => boolean;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  selectNode: (id: TreeNodeId) => void;
};

const useKeyboardInteraction = ({
  openedIds,
  initialSelectedId,
  toggleNode,
  visibleNodes,
}: UseKeyboardInteractionProps): UseKeyboardInteractionOutput => {
  const [selectedNodeId, setSelectedNodeId] = useState<TreeNodeId | null>(
    initialSelectedId
  );

  const isSelectedFn = useCallback(
    (id: TreeNodeId) => selectedNodeId === id,
    [selectedNodeId]
  );

  const selectNode = (id: TreeNodeId | null) => {
    setSelectedNodeId(id);
  };

  const isSelectedIsExtended = useCallback(
    () => (selectedNodeId ? openedIds.has(selectedNodeId) : false),
    [selectedNodeId, openedIds]
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!selectedNodeId) return;

    if (!isAllowedEventKey(event.key)) return;

    const selectedIndex = visibleNodes.findIndex(
      (node) => node.id === selectedNodeId
    );

    if (selectedIndex === -1) return; // Focused node not found in visible nodes

    const selectedNode = visibleNodes[selectedIndex];

    const isSelectedNodeHasChild =
      selectedNode.children && selectedNode.children.length > 0;

    let nextIndex = selectedIndex;

    const eventKeyMapper: Record<AllowedEventKeys, () => void> = {
      ArrowDown: () => {
        // Calculate the next index, wrapping around if necessary
        nextIndex = (selectedIndex + 1) % visibleNodes.length;
      },
      ArrowUp: () => {
        nextIndex =
          // Calculate the previous index, wrapping around if necessary
          (selectedIndex - 1 + visibleNodes.length) % visibleNodes.length;
      },
      ArrowRight: () => {
        if (isSelectedNodeHasChild) {
          if (isSelectedIsExtended()) {
            nextIndex = visibleNodes.findIndex(
              (node) => node.id === selectedNode.children![0].id
            );
          } else {
            // If the node is not expanded, toggle it
            toggleNode(selectedNodeId);
          }
        }
      },
      ArrowLeft: () => {
        if (isSelectedIsExtended()) {
          // If the node is expanded, collapse it
          toggleNode(selectedNodeId);
        } else {
          // If the node is not expanded, move to the parent node
          const parentIndex = visibleNodes.findIndex((node) => {
            if (!node.children) return false;
            return node.children.some((child) => child.id === selectedNodeId);
          });

          nextIndex = parentIndex !== -1 ? parentIndex : selectedIndex;
        }
      },
      Enter: () => {
        if (selectedNodeId) {
          toggleNode(selectedNodeId);
        }
      },
      " ": () => {
        if (selectedNodeId) {
          // unselect the selected node
          nextIndex = -1;
        }
      },
    };

    eventKeyMapper[event.key as AllowedEventKeys]();

    const nextSelectedId = visibleNodes[nextIndex]?.id || null;

    selectNode(nextSelectedId);
  };

  return {
    isSelectedFn,
    selectNode,
    handleKeyDown,
  };
};
export default useKeyboardInteraction;
