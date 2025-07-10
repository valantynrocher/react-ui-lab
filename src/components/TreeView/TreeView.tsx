import useExpanded from "@/components/TreeView/hooks/useExpanded";
import useSelected from "@/components/TreeView/hooks/useSelected";
import { mockTreeData } from "@/components/TreeView/mockTree";
import TreeNode from "@/components/TreeView/TreeNode";
import { Stack, Typography } from "@mui/material";

const TreeView = () => {
  const { expandedIds, toggle, isExpanded } = useExpanded();
  const { select, isSelected } = useSelected();

  return (
    <>
      <Typography>
        Les noeuds ouverts sont {Array.from(expandedIds).join(", ")}
      </Typography>
      <Stack>
        <ul role="tree" style={{ padding: 0, margin: "auto", width: 300 }}>
          {mockTreeData.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              isExpanded={isExpanded}
              onToggleExpand={toggle}
              onSelect={select}
              isSelected={isSelected}
            />
          ))}
        </ul>
      </Stack>
    </>
  );
};

export default TreeView;
