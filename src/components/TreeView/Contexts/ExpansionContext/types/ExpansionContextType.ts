import type {
  InternalNode,
  TreeNodeId,
} from "@/components/TreeView/types/nodes";

export interface ExpansionContextType {
  expandedIds: Set<TreeNodeId>;
  visibleNodes: InternalNode[];
  toggleExpansion: (id: TreeNodeId) => void;
  isExpandedFn: (id: TreeNodeId) => boolean;
}
