import SelectionContext from "@/components/TreeView/Contexts/SelectionContext/SelectionContext";
import type { SelectionProviderProps } from "@/components/TreeView/Contexts/SelectionContext/types/SelectionProviderProps";
import type { TreeNodeId } from "@/components/TreeView/types/nodes";
import { useCallback, useMemo, useState } from "react";

const SelectionProvider = ({
  children,
  defaultSelectedId,
  onSelectionClick,
  selectedId: controlledSelectedId,
}: SelectionProviderProps) => {
  const [internalSelectedNodeId, setInternalSelectedNodeId] =
    useState<TreeNodeId | null>(defaultSelectedId ?? null);

  const isControlled = controlledSelectedId !== undefined;

  const selectedNodeId = useMemo(
    () => (isControlled ? controlledSelectedId : internalSelectedNodeId),
    [controlledSelectedId, internalSelectedNodeId, isControlled]
  );

  const setSelectedNodeId = useCallback(
    (next: typeof internalSelectedNodeId) => {
      if (!isControlled) setInternalSelectedNodeId(next);
    },
    [isControlled]
  );

  const isSelectedFn = useCallback(
    (id: TreeNodeId) => selectedNodeId === id,
    [selectedNodeId]
  );

  const selectNode = (id: TreeNodeId | null) => {
    setSelectedNodeId(id);
    onSelectionClick?.(id);
  };

  return (
    <SelectionContext.Provider
      value={{
        selectedNodeId,
        selectNode,
        isSelectedFn,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export default SelectionProvider;
