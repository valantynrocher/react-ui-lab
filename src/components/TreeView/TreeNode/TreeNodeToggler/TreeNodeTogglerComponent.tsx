import { useCustomizationContext } from "@/components/TreeView/Contexts/CustomizationContext";
import { useExpansionContext } from "@/components/TreeView/Contexts/ExpansionContext";
import { useSelectionContext } from "@/components/TreeView/Contexts/SelectionContext";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useCallback } from "react";
import type { TreeNodeTogglerProps } from "./props";

const TreeNodeTogglerComponent = ({
  id,
  hasChildren,
  isExpanded,
}: TreeNodeTogglerProps) => {
  const { slots, slotProps } = useCustomizationContext();
  const { selectNode } = useSelectionContext();
  const { toggleExpansion } = useExpansionContext();
  const { ExpandIcon, CollapseIcon } = slots;

  const handleIconClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.type !== "click" || event.metaKey || event.ctrlKey) return;

      selectNode(id, event);

      toggleExpansion(id);
    },
    [id, selectNode, toggleExpansion]
  );

  return (
    <ListItemIcon
      sx={{
        minWidth: 24,
      }}
      onClick={handleIconClick}
    >
      {hasChildren ? (
        isExpanded ? (
          <CollapseIcon {...slotProps.CollapseIcon} />
        ) : (
          <ExpandIcon {...slotProps.ExpandIcon} />
        )
      ) : null}
    </ListItemIcon>
  );
};

export default TreeNodeTogglerComponent;
