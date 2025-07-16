export type TreeNodeType = {
  id: string;
  label: string;
  level: number;
  parentId?: string;
  type: "root" | "child" | "end";
  children?: TreeNodeType[];
};

export type TreeNodeId = TreeNodeType["id"];
