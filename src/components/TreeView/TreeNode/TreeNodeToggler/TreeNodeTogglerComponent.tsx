import { useTreeViewRenderingContext } from "@/components/TreeView/Contexts/RenderingContext";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import type { TreeNodeTogglerProps } from "./props";

const TreeItemIcon = (props: React.ComponentProps<typeof MuiListItemIcon>) => (
  <MuiListItemIcon
    sx={{
      minWidth: 24,
      ...props.sx,
    }}
    {...props}
  />
);

const TreeNodeTogglerComponent = ({
  isOpen,
  onClick,
  hasChildren,
}: TreeNodeTogglerProps) => {
  const { slots, slotProps } = useTreeViewRenderingContext();

  const { ExpandIcon, CollapseIcon } = slots;

  return hasChildren ? (
    <TreeItemIcon onClick={onClick}>
      {isOpen ? (
        <CollapseIcon {...slotProps.CollapseIcon} />
      ) : (
        <ExpandIcon {...slotProps.ExpandIcon} />
      )}
    </TreeItemIcon>
  ) : (
    <TreeItemIcon />
  );
};

export default TreeNodeTogglerComponent;
