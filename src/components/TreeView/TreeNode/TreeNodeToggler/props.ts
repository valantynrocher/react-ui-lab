import type { InternalNode, NodeMeta } from "@/components/TreeView/types/nodes";

export interface TreeNodeTogglerProps {
  id: InternalNode["id"];
  hasChildren: InternalNode["_hasChildren"];
  isExpanded: NodeMeta["_isExpanded"];
}
