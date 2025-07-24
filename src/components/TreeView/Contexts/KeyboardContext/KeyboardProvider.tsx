import { useExpansionContext } from "@/components/TreeView/Contexts/ExpansionContext";
import KeyboardContext from "@/components/TreeView/Contexts/KeyboardContext/KeyboardContext";
import type { KeyboardProviderProps } from "@/components/TreeView/Contexts/KeyboardContext/types/KeyboardProviderProps";
import { useSelectionContext } from "@/components/TreeView/Contexts/SelectionContext";
import isAllowedEventKey, {
  type AllowedEventKeys,
} from "@/components/TreeView/utils/AllowedEventKeys";
import React, { useCallback } from "react";

const KeyboardProvider = ({ children }: KeyboardProviderProps) => {
  const { selectNode, selectedNodeId } = useSelectionContext();
  const { expandedIds, visibleNodes, toggleExpansion } = useExpansionContext();

  const isSelectedIsExtended = useCallback(
    () => (selectedNodeId ? expandedIds.has(selectedNodeId) : false),
    [expandedIds, selectedNodeId]
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
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
            toggleExpansion(selectedNodeId);
          }
        }
      },
      ArrowLeft: () => {
        if (isSelectedIsExtended()) {
          // If the node is expanded, collapse it
          toggleExpansion(selectedNodeId);
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
          toggleExpansion(selectedNodeId);
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

  return (
    <KeyboardContext.Provider
      value={{
        onKeyDown,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};

export default KeyboardProvider;
