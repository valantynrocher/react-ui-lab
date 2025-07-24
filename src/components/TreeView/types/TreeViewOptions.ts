/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TreeNodeId } from "./nodes";
import type {
  DefaultSlots,
  ExternalSlots,
  InferExternalSlotProps,
} from "./slots";

export type TreeViewOptions<S extends ExternalSlots = DefaultSlots> = {
  /**
   * DATA PROPS
   */

  /**
   * Data structure representing all the tree nodes
   */
  nodes: any[];
  /**
   * function needed if the uniq identifier is not called "id" on the node object
   */
  getNodeId?: (node: any) => any;
  /**
   * function needed if the node label is not called "label" on the node object
   */
  getNodeLabel?: (node: any) => any;
  /**
   * function needed if the node children is not called "children" on the node object
   */
  getNodeChildren?: (node: any) => any[];

  /**
   * CUSTOMIZATION PROPS
   */

  /**
   * Custom object to customize some components
   */
  slots?: ExternalSlots;
  /**
   * Custom object to customize the props given to the slot components
   */
  slotProps?: InferExternalSlotProps<S>;
  /**
   * Function to customize the label rendering
   */
  renderLabel?: (node: any) => React.ReactNode;
  /**
   * Function to customize the node start icon rendering
   */
  renderStartIcon?: (node: any) => React.ReactNode;

  /**
   * SELECTION PROPS
   */

  /**
   * Id of the selected node controlled out of the box
   */
  selectedId?: TreeNodeId;
  /**
   * Id of the initial selected node
   */
  defaultSelectedId?: TreeNodeId;
  /**
   * Function to track when a node is selected
   */
  onSelectionClick?: (id: TreeNodeId | null) => void;

  /**
   * EXPANSION PROPS
   */

  /**
   * Array of ids of all the expanded nodes controlled out of the box
   */
  expandedIds?: TreeNodeId[];
  /**
   * Array of ids of the initial expanded nodes
   */
  defaultExpandedIds?: TreeNodeId[];
  /**
   * Function to track when a node is expanded or collapsed
   */
  onExpansionClick?: (id: TreeNodeId, action: "expand" | "collapse") => void;
};
