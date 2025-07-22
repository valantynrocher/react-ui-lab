import { TreeViewInteractionContextProvider } from "@/components/TreeView/Contexts/InteractionContext";
import { TreeViewRenderingContextProvider } from "@/components/TreeView/Contexts/RenderingContext";
import type { TreeViewProps } from "@/components/TreeView/props";
import Tree from "@/components/TreeView/Tree";
import Stack from "@mui/material/Stack";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const TreeView = ({
  treeData,
  defaultSelectedId = "",
  defaultOpenedIds = [],
  slots = {
    ExpandIcon: ExpandMore,
    CollapseIcon: ExpandLess,
  },
  slotProps = {
    ExpandIcon: {},
    CollapseIcon: {},
  },
  renderStartIcon,
  renderLabel,
}: TreeViewProps) => {
  return (
    <TreeViewRenderingContextProvider
      slots={slots}
      slotProps={slotProps}
      renderStartIcon={renderStartIcon}
      renderLabel={renderLabel}
    >
      <TreeViewInteractionContextProvider
        treeData={treeData}
        defaultSelectedId={defaultSelectedId}
        defaultOpenedIds={defaultOpenedIds}
      >
        <Stack alignItems={"center"}>
          <Tree />
        </Stack>
      </TreeViewInteractionContextProvider>
    </TreeViewRenderingContextProvider>
  );
};

export default TreeView;
