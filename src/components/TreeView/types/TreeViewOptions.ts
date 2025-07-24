/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TreeNodeId } from "./nodes";
import type {
  DefaultSlots,
  ExternalSlots,
  InferExternalSlotProps,
} from "./slots";

export type TreeViewOptions<S extends ExternalSlots = DefaultSlots> = {
  /**
   * Data structure representing the tree
   */
  nodes: any[];
  /**
   * function to give if the uniq identifier is not called "id"
   * @param node
   * @returns the uniq identifier
   */
  getNodeId?: (node: any) => any;
  /**
   * function to give if the node label is not called "label"
   * @param node
   * @returns the node label
   */
  getNodeLabel?: (node: any) => any;
  /**
   * function to give if the node children is not called "children"
   * @param node
   * @returns the node children
   */
  getNodeChildren?: (node: any) => any[];

  slots?: ExternalSlots;
  slotProps?: InferExternalSlotProps<S>;
  renderLabel?: (node: any) => React.ReactNode;
  renderStartIcon?: (node: any) => React.ReactNode;

  selectedId?: TreeNodeId;
  defaultSelectedId?: TreeNodeId;
  /**
   * Use onSelectionClick to track a selected item
   * @param id
   * @returns
   */
  onSelectionClick?: (id: TreeNodeId | null) => void;

  expandedIds?: TreeNodeId[];
  defaultExpandedIds?: TreeNodeId[];
  onExpansionClick?: (id: TreeNodeId, action: "open" | "close") => void;
};
