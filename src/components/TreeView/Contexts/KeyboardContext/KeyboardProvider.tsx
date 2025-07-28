import { useExpansionContext } from "@/components/TreeView/Contexts/ExpansionContext";
import KeyboardContext from "@/components/TreeView/Contexts/KeyboardContext/KeyboardContext";
import type { KeyboardProviderProps } from "@/components/TreeView/Contexts/KeyboardContext/types/KeyboardProviderProps";
import { useSelectionContext } from "@/components/TreeView/Contexts/SelectionContext";
import useNodeMeta from "@/components/TreeView/hooks/useNodeMeta";
import isAllowedEventKey, {
  type AllowedEventKeys,
} from "@/components/TreeView/utils/AllowedEventKeys";
import React from "react";

const KeyboardProvider = ({ children }: KeyboardProviderProps) => {
  const { selectNode, multiSelection, focusedId, setFocusedId } =
    useSelectionContext();
  const { visibleNodes, toggleExpansion } = useExpansionContext();
  const [getNodeMeta] = useNodeMeta();

  const onKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!focusedId) return;
    if (!isAllowedEventKey(event.key)) return;

    const focusedIndex = visibleNodes.findIndex(
      (node) => node.id === focusedId
    );

    if (focusedIndex === -1) return; // Focused node not found in visible nodes

    const focusedNode = visibleNodes[focusedIndex];
    const { _hasChildren } = focusedNode;
    const { _isExpanded } = getNodeMeta(focusedNode);

    let nextIndex = focusedIndex;

    const eventKeyMapper: Record<AllowedEventKeys, () => void> = {
      ArrowDown: () => {
        // Calculate the next index, wrapping around if necessary
        nextIndex = (focusedIndex + 1) % visibleNodes.length;
      },
      ArrowUp: () => {
        nextIndex =
          // Calculate the previous index, wrapping around if necessary
          (focusedIndex - 1 + visibleNodes.length) % visibleNodes.length;
      },
      ArrowRight: () => {
        if (_hasChildren) {
          if (_isExpanded) {
            nextIndex = visibleNodes.findIndex(
              (node) => node.id === focusedNode.children![0].id
            );
          } else {
            // If the node is not expanded, toggle it
            toggleExpansion(focusedId);
          }
        }
      },
      ArrowLeft: () => {
        if (_isExpanded) {
          // If the node is expanded, collapse it
          toggleExpansion(focusedId);
        } else {
          // If the node is not expanded, move to the parent node
          const parentIndex = visibleNodes.findIndex((node) => {
            if (!node.children) return false;
            return node.children.some((child) => child.id === focusedId);
          });

          nextIndex = parentIndex !== -1 ? parentIndex : focusedIndex;
        }
      },
      Enter: () => {
        toggleExpansion(focusedId);
      },
      " ": () => {
        if (multiSelection) {
          toggleExpansion(focusedId);
        } else {
          selectNode(focusedId, event);
        }
      },
    };

    eventKeyMapper[event.key as AllowedEventKeys]();

    const nextFocusedId = visibleNodes[nextIndex]?.id || null;
    setFocusedId(nextFocusedId);

    const shouldChangeSelection =
      !multiSelection && event.key === " " && nextFocusedId;
    if (shouldChangeSelection) selectNode(nextFocusedId, event);
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
