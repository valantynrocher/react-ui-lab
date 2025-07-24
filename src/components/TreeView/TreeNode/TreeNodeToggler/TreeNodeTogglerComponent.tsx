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
  hasChildren,
}: TreeNodeTogglerProps) => {
  const { slots, slotProps } = useCustomizationContext();

  const { ExpandIcon, CollapseIcon } = slots;

  return (
    <TreeItemIcon>
      {hasChildren ? (
        isOpen ? (
          <CollapseIcon {...slotProps.CollapseIcon} />
        ) : (
          <ExpandIcon {...slotProps.ExpandIcon} />
        )
      ) : null}
    </TreeItemIcon>
  );
};

export default TreeNodeTogglerComponent;
