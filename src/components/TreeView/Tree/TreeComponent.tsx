import { TreeViewInteractionHooks } from "@/components/TreeView/Contexts/InteractionContext";
import TreeNode from "@/components/TreeView/TreeNode";

const TreeComponent = () => {
  const { treeData } = TreeViewInteractionHooks.useInteractionState();
  const { handleKeyDown } = TreeViewInteractionHooks.useKeyboardInteraction();
  return (
    <ul
      role="tree"
      onKeyDown={handleKeyDown}
      style={{
        padding: 0,
        margin: "auto",
        width: 300,
      }}
    >
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

export default TreeComponent;
