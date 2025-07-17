import { TreeViewRenderingProvider } from "@/components/TreeView/Contexts/RenderingContext";
import useKeyboardInteraction from "@/components/TreeView/hooks/useKeyboardInteraction";
import useOpenCloseInteraction from "@/components/TreeView/hooks/useOpenCloseInteraction";
import type { TreeViewProps } from "@/components/TreeView/props";
import TreeNode from "@/components/TreeView/TreeNode";
import Stack from "@mui/material/Stack";

const TreeView = ({
  treeData,
  initialSelectedId,
  initialOpenedIds,
  slots,
  slotProps,
  renderStartIcon,
  renderLabel,
}: TreeViewProps) => {
  const { openedIds, toggleNode, isOpenedFn, visibleNodes } =
    useOpenCloseInteraction({
      treeData,
      initialOpenedIds,
    });
  const { isSelectedFn, handleKeyDown, selectNode } = useKeyboardInteraction({
    initialSelectedId,
    visibleNodes,
    openedIds,
    toggleNode,
  });

  return (
    <TreeViewRenderingProvider
      slots={slots}
      slotProps={slotProps}
      renderStartIcon={renderStartIcon}
      renderLabel={renderLabel}
    >
      <Stack alignItems={"center"}>
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
            <TreeNode
              key={node.id}
              node={node}
              isOpenedFn={isOpenedFn}
              toggleNode={toggleNode}
              selectNode={selectNode}
              isSelectedFn={isSelectedFn}
            />
          ))}
        </ul>
      </Stack>
    </TreeViewRenderingProvider>
  );
};

export default TreeView;
