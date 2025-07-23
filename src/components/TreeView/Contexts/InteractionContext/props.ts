import type { TreeNodeId, TreeNodeType } from "@/components/TreeView/types";

export interface TreeViewInteractionContextProps {
  children: React.ReactNode;
  /** The tree data structure to be displayed in the TreeView. */
  treeData: TreeNodeType[];

  /**
   * Uncontrolled mode props
   * These props are used when the TreeView is in uncontrolled mode,
   * meaning the component manages its own state internally.
   */
  /** The initial selected node ID */
  defaultSelectedId?: TreeNodeId;
  /** The initial opened node IDs */
  defaultOpenedIds?: TreeNodeId[];

  /**
   * Controlled mode props
   * These props are used when the TreeView is in controlled mode,
   * meaning the parent component manages the state of the TreeView.
   */
  /** The selected node ID */
  selectedId?: TreeNodeId | null;
  /** Callback function when a node is selected */
  onSelect?: (id: TreeNodeId | null) => void;
  /** The opened node IDs */
  openedIds?: TreeNodeId[];
  /** Callback function when a node is toggled (opened/closed) */
  onToggle?: (id: TreeNodeId) => void;
}
