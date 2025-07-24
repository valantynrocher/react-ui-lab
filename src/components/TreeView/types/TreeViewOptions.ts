/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  InternalNode,
  MapToInternal,
  NodeRequiredShape,
  TreeNodeId,
} from "./nodes";
import type {
  DefaultSlots,
  ExternalSlots,
  InferExternalSlotProps,
} from "./slots";

interface OptionsBase<S extends ExternalSlots = DefaultSlots> {
  slots?: ExternalSlots;
  slotProps?: InferExternalSlotProps<S>;
  renderLabel?: (node: any) => React.ReactNode;
  renderStartIcon?: (node: any) => React.ReactNode;

  selectedId?: TreeNodeId;
  defaultSelectedId?: TreeNodeId;
  onSelectionClick?: (id: TreeNodeId | null) => void;

  expandedIds?: TreeNodeId[];
  defaultExpandedIds?: TreeNodeId[];
  onExpansionClick?: (id: TreeNodeId, action: "open" | "close") => void;
}

export interface OptionsWithExternalDataType<Node> {
  /**
   * Data structure representing the tree
   */
  nodes: Node[];
  mapToInternal: MapToInternal<Node>;
}

export interface OptionsWithInternalData {
  /**
   * Data structure representing the tree
   */
  nodes: InternalNode[];
}

export type TreeViewOptions<
  Node extends unknown | NodeRequiredShape = unknown,
  S extends ExternalSlots = DefaultSlots
> = OptionsBase<S> &
  (OptionsWithExternalDataType<Node> | OptionsWithInternalData);
