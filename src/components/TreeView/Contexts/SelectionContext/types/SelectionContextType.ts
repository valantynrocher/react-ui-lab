import type { TreeNodeId } from "@/components/TreeView/types/nodes";
import type { TreeViewOptions } from "@/components/TreeView/types/TreeViewOptions";

export type SelectionContextType = Pick<TreeViewOptions, "multiSelection"> & {
  selectedIds: Set<TreeNodeId>;
  focusedId: string | null;
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
  selectNode: (
    id: TreeNodeId,
    event: React.MouseEvent | React.KeyboardEvent
  ) => void;
  isSelectedFn: (id: TreeNodeId) => boolean;
  isFocusedFn: (id: TreeNodeId) => boolean;
};
