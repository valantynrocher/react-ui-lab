import { mockTreeData } from "@/components/TreeView/mockTree";
import TreeNode from "@/components/TreeView/TreeNode";

const TreeView = () => {
  return mockTreeData.map((node) => <TreeNode key={node.id} node={node} />);
};

export default TreeView;
