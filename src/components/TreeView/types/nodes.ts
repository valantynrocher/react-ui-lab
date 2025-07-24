export type TreeNodeId = string;
export type TreeNodeType = "root" | "child" | "end";

export type NodeRequiredShape = {
  id: string;
  label: string;
  children?: NodeRequiredShape[];
};

export type InternalNode<T = unknown> = {
  id: string;
  label: string;
  level: number;
  parentId?: string;
  type: "root" | "child" | "end";
  children?: InternalNode<T>[];
  originalNode?: T;
};

export type MapToInternal<T> = (
  node: T,
  parentId: string | undefined,
  level: number
) => Omit<InternalNode<T>, "children">;
