/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InternalNode } from "@/components/TreeView/types/nodes";
import type { TreeViewOptions } from "@/components/TreeView/types/TreeViewOptions";
import { useEffect, useState } from "react";

/**
 *
 * @param param
 * @returns
 */
const useNormalizedNodes = ({
  nodes: rawNodes,
  getNodeChildren,
  getNodeId,
  getNodeLabel,
}: Pick<
  TreeViewOptions,
  "nodes" | "getNodeChildren" | "getNodeId" | "getNodeLabel"
>) => {
  const [nodes, setNodes] = useState<InternalNode[]>([]);

  useEffect(() => {
    const normalize = (
      nodes: any[],
      parentId?: string,
      level = 0
    ): InternalNode[] =>
      nodes.map((inputNode): InternalNode => {
        let id = inputNode.id || getNodeId?.(inputNode);

        if (!id) {
          throw new Error(
            "If your node doesn't has a uniq identifier called 'id', you must give the 'getNodeId' props."
          );
        }
        id = String(id);

        let label = inputNode.label || getNodeLabel?.(inputNode);

        if (!label) {
          throw new Error(
            "If your node doesn't has a 'label' property', you must give the 'getNodeLabel' props."
          );
        }
        label = String(label);

        const children = inputNode.children || getNodeChildren?.(inputNode);

        const hasChildren = Array.isArray(children) && children.length > 0;

        const outputNode: InternalNode = {
          id,
          label,
          level,
          parentId,
          type: !parentId ? "root" : hasChildren ? "child" : "end",
          children: hasChildren
            ? normalize(children, id, level + 1)
            : undefined,
          originalNode: inputNode,
        };

        return outputNode;
      });

    setNodes(normalize(rawNodes));
  }, [getNodeChildren, getNodeId, getNodeLabel, rawNodes]);

  return nodes;
};

export default useNormalizedNodes;
