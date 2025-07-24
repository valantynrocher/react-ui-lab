import type { TreeNodeId } from "@/components/TreeView/types/nodes";

export interface SelectionContextType {
  selectedNodeId: TreeNodeId | null;
  selectNode: (id: TreeNodeId | null) => void;
  isSelectedFn: (id: TreeNodeId) => boolean;
}
