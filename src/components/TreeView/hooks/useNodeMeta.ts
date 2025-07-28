import { useExpansionContext } from "@/components/TreeView/Contexts/ExpansionContext";
import { useSelectionContext } from "@/components/TreeView/Contexts/SelectionContext";
import type { InternalNode, NodeMeta } from "@/components/TreeView/types/nodes";

const useNodeMeta = (): [(node: InternalNode) => NodeMeta] => {
  const { isExpandedFn } = useExpansionContext();
  const { isSelectedFn } = useSelectionContext();

  const getNodeMeta = (node: InternalNode): NodeMeta => ({
    _isExpanded: isExpandedFn(node.id),
    _isSelected: isSelectedFn(node.id),
  });

  return [getNodeMeta] as const;
};

export default useNodeMeta;
