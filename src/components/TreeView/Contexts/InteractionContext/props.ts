import type { TreeNodeId, TreeNodeType } from "@/components/TreeView/types";

export interface TreeViewInteractionContextProps {
  children: React.ReactNode;
  /** The tree data structure to be displayed in the TreeView. */
  treeData: TreeNodeType[];
  /** The initial selected node ID */
  defaultSelectedId: TreeNodeId | null;
  /** The initial opened node IDs */
  defaultOpenedIds?: TreeNodeId[] | Set<TreeNodeId>;
}
