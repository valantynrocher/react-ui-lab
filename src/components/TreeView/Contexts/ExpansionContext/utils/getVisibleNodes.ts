import type {
  InternalNode,
  TreeNodeId,
} from "@/components/TreeView/types/nodes";
import traverseTree from "@/components/TreeView/utils/traverse";

const getVisibleNodes = (
  nodes: InternalNode[],
  expandedIds: Set<TreeNodeId>
): InternalNode[] => {
  const visibleNodes: InternalNode[] = [];

  traverseTree(nodes, (node, parent) => {
    // Only add node if it's a root or its parent is expanded
    const isVisible = !parent || expandedIds.has(parent.id);
    if (isVisible) {
      visibleNodes.push(node);
    }
  });

  return visibleNodes;
};

export default getVisibleNodes;
