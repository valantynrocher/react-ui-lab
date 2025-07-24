import { useCustomizationContext } from "@/components/TreeView/Contexts/CustomizationContext";
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
  const { slots, slotProps } = useCustomizationContext();

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
