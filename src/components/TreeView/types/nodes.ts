export type TreeNodeId = string;
export type TreeNodeType = "root" | "child" | "end";

export type InternalNode<T = unknown> = {
  id: string;
  label: string;
  children?: InternalNode<T>[];
  level: number;
  parentId?: string;
  type: "root" | "child" | "end";
  originalNode?: T;
};
