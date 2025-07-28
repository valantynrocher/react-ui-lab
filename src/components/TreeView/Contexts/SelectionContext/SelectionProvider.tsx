import { useExpansionContext } from "@/components/TreeView/Contexts/ExpansionContext";
import SelectionContext from "@/components/TreeView/Contexts/SelectionContext/SelectionContext";
import type { SelectionProviderProps } from "@/components/TreeView/Contexts/SelectionContext/types/SelectionProviderProps";
import type { TreeNodeId } from "@/components/TreeView/types/nodes";
import useControllableSet from "@/lib/hooks/useControllableSet";
import { useCallback, useRef, useState } from "react";

const getIndexRange = (start: number, end: number): number[] => {
  const [from, to] = start < end ? [start, end] : [end, start];
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
};

const SelectionProvider = ({
  children,
  defaultSelectedIds,
  onSelectionClick,
  selectedIds: controlledSelectedIds,
  multiSelection,
}: SelectionProviderProps) => {
  const { visibleNodes } = useExpansionContext();
  const [selectedIds, setSelectedIds] = useControllableSet(
    defaultSelectedIds,
    controlledSelectedIds
  );
  const previousSelectedId = useRef<string | null>(null);
  const [focusedId, setFocusedId] = useState<TreeNodeId | null>(null);

  const isSelectedFn = useCallback(
    (id: TreeNodeId) => selectedIds.has(id),
    [selectedIds]
  );

  const isFocusedFn = useCallback(
    (id: TreeNodeId) => focusedId === id,
    [focusedId]
  );

  const selectNode = (
    id: TreeNodeId,
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const next = new Set<string>(selectedIds);
    const isSelected = next.has(id);

    if (!multiSelection) {
      if (isSelected) return; // don't select the same node twice

      next.clear();
      next.add(id);
    } else {
      if (event.shiftKey) {
        const currentIndex = visibleNodes.findIndex((node) => node.id === id);
        if (currentIndex === -1) return;

        const previousIndex = visibleNodes.findIndex(
          (node) => node.id === previousSelectedId.current
        );
        if (previousIndex === -1) return;

        next.clear();

        const startIndex = Math.min(currentIndex, previousIndex);
        const endIndex = Math.max(currentIndex, previousIndex);
        const indexRange = getIndexRange(startIndex, endIndex);
        indexRange.forEach((index) => {
          if (index === -1) return;
          const { id } = visibleNodes[index];
          next.add(id);
        });
      } else if (event.metaKey || event.ctrlKey) {
        if (isSelected) {
          next.delete(id);
        } else {
          next.add(id);
        }
      } else {
        next.clear();
        next.add(id);
      }
    }

    setSelectedIds(next);
    previousSelectedId.current = id;
    setFocusedId(id);
    onSelectionClick?.(id);
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedIds,
        focusedId,
        setFocusedId,
        selectNode,
        isSelectedFn,
        isFocusedFn,
        multiSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionProvider;
