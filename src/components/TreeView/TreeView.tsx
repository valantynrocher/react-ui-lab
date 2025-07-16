import useOpenCloseInteraction from "@/components/TreeView/hooks/useOpenCloseInteraction";
import useKeyboardInteraction from "@/components/TreeView/hooks/useKeyboardInteraction";
import { mockTreeData } from "@/components/TreeView/mockTree";
import TreeNode from "@/components/TreeView/TreeNode";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const TreeView = () => {
  const { openedIds, toggleNode, isOpenedFn, visibleNodes } =
    useOpenCloseInteraction({
      treeData: mockTreeData,
    });
  const { isSelectedFn, handleKeyDown, selectNode } = useKeyboardInteraction({
    visibleNodes,
    openedIds,
    initialSelectedId: null,
    toggleNode,
  });

  return (
    <>
      <Typography>
        Les noeuds ouverts sont {Array.from(openedIds).join(", ")}
      </Typography>
      <Stack>
        <ul
          role="tree"
          onKeyDown={handleKeyDown}
          style={{
            padding: 0,
            margin: "auto",
            width: 300,
          }}
        >
          {mockTreeData.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              isOpenedFn={isOpenedFn}
              onToggleClick={toggleNode}
              onSelectClick={selectNode}
              isSelectedFn={isSelectedFn}
            />
          ))}
        </ul>
      </Stack>
    </>
  );
};

export default TreeView;
