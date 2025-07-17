import { useTreeViewRenderingContext } from "@/components/TreeView/Contexts/RenderingContext";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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

const TreeNodeToggler = ({
  isOpen,
  onClick,
  hasChildren,
}: TreeNodeTogglerProps) => {
  const {
    slots = {
      expandIcon: ExpandMore,
      collapseIcon: ExpandLess,
    },
    slotProps = {
      expandIcon: {},
      collapseIcon: {},
    },
  } = useTreeViewRenderingContext();

  const ExpandIcon = slots.expandIcon;
  const CollapseIcon = slots.collapseIcon;

  return hasChildren ? (
    <TreeItemIcon onClick={onClick}>
      {isOpen ? (
        <CollapseIcon {...slotProps.collapseIcon} />
      ) : (
        <ExpandIcon {...slotProps.expandIcon} />
      )}
    </TreeItemIcon>
  ) : (
    <TreeItemIcon />
  );
};

export default TreeNodeToggler;
