export type TreeNodeType = {
  id: string;
  label: string;
  level: number;
  children?: TreeNodeType[];
};

export type TreeNodeId = TreeNodeType["id"];
