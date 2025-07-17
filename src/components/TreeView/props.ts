import type {
  DefaultTreeViewSlots,
  TreeViewRenderingContextProps,
  TreeViewSlots,
} from "@/components/TreeView/Contexts/RenderingContext";
import type { TreeNodeId, TreeNodeType } from "@/components/TreeView/types";

export interface TreeViewProps<S extends TreeViewSlots = DefaultTreeViewSlots>
  extends TreeViewRenderingContextProps<S> {
  /** The data to display in the tree view */
  treeData: TreeNodeType[];
  /** The initial selected node ID */
  initialSelectedId: TreeNodeId | null;
  /** The initial opened node IDs */
  initialOpenedIds?: TreeNodeId[] | Set<TreeNodeId>;
}
