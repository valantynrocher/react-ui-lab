import useExpanded from "@/components/TreeView/hooks/useExpanded";
import { mockTreeData } from "@/components/TreeView/mockTree";
import TreeNode from "@/components/TreeView/TreeNode";
import { Typography } from "@mui/material";

const TreeView = () => {
  const { expandedIds, toggle, isExpanded } = useExpanded();

  return (
    <>
      <Typography>
        Les noeuds ouverts sont {Array.from(expandedIds).join(", ")}
      </Typography>
      {mockTreeData.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          isExpanded={isExpanded}
          onToggle={toggle}
        />
      ))}
    </>
  );
};

export default TreeView;
