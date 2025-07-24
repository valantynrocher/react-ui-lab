import type {
  MapToInternal,
  InternalNode,
  NodeRequiredShape,
  TreeNodeType,
} from "@/components/TreeView/types/nodes";
import { useState, useEffect } from "react";

/**
 * Overloads
 */
// Overload 1 – if custom type is used, mapper is required
export function useNormalizedTree<External>(
  rawNodes: External[],
  mapToInternal: MapToInternal<External>
): readonly [
  InternalNode<External>[],
  React.Dispatch<React.SetStateAction<InternalNode<External>[]>>
];

// Overload 2 – external nodes follow the required shape, mapper is useless
export function useNormalizedTree<External extends NodeRequiredShape>(
  rawNodes: External[]
): readonly [
  InternalNode<External>[],
  React.Dispatch<React.SetStateAction<InternalNode<External>[]>>
];

/**
 * Implémentation
 */
export function useNormalizedTree<External>(
  rawNodes: External[],
  mapToInternal?: MapToInternal<External>
) {
  const [tree, setTree] = useState<InternalNode<unknown>[]>([]);

  useEffect(() => {
    const normalize = (
      nodes: External[],
      parentId?: string,
      level = 0
    ): InternalNode<unknown>[] =>
      nodes.map((node): InternalNode<unknown> => {
        const hasMapper = typeof mapToInternal === "function";

        const childrenRaw = hasMapper
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (node as any).children ?? undefined
          : (node as NodeRequiredShape).children ?? undefined;

        const hasChildren =
          Array.isArray(childrenRaw) && childrenRaw.length > 0;

        const base = hasMapper
          ? {
              ...mapToInternal(node, parentId, level),
              originalNode: node,
            }
          : {
              id: (node as NodeRequiredShape).id,
              label: (node as NodeRequiredShape).label,
              level,
              parentId,
              type: (!parentId
                ? "root"
                : hasChildren
                ? "child"
                : "end") as TreeNodeType,
            };

        const internalNode: InternalNode<unknown> = {
          ...base,
          ...(hasChildren && {
            children: normalize(childrenRaw!, base.id, level + 1),
          }),
        };

        return internalNode;
      });

    setTree(normalize(rawNodes));
  }, [rawNodes, mapToInternal]);

  return [tree, setTree] as const;
}
