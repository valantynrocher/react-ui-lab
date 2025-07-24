import { useDataContext } from "@/components/TreeView/Contexts/DataContext";
import { useKeyboardContext } from "@/components/TreeView/Contexts/KeyboardContext";
import TreeNode from "@/components/TreeView/TreeNode";

const TreeComponent = () => {
  const { nodes } = useDataContext();
  const { onKeyDown } = useKeyboardContext();
  return (
    <ul
      role="tree"
      onKeyDown={onKeyDown}
      style={{
        padding: 0,
        margin: "auto",
        width: 300,
      }}
    >
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

export default TreeComponent;
