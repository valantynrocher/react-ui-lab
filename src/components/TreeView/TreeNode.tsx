import type { UseOpenCloseInteractionOutput } from "@/components/TreeView/hooks/useOpenCloseInteraction";
import type { UseKeyboardInteractionOutput } from "@/components/TreeView/hooks/useKeyboardInteraction";
import type { TreeNodeType } from "@/components/TreeView/types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useCallback } from "react";

export interface TreeNodeProps
  extends Pick<UseOpenCloseInteractionOutput, "isOpenedFn">,
    Pick<UseKeyboardInteractionOutput, "isSelectedFn"> {
  node: TreeNodeType;
  onToggleClick: UseOpenCloseInteractionOutput["toggleNode"];
  onSelectClick: UseKeyboardInteractionOutput["selectNode"];
}

const TreeNodeItemIcon = (props: React.ComponentProps<typeof ListItemIcon>) => (
  <ListItemIcon
    sx={{
      minWidth: 24,
      ...props.sx,
    }}
    {...props}
  />
);

const TreeNode = ({
  node,
  onToggleClick,
  isOpenedFn,
  onSelectClick,
  isSelectedFn,
}: TreeNodeProps) => {
  const isOpen = isOpenedFn(node.id);
  const isSelected = isSelectedFn(node.id);
  const hasChildren = node.children ? node.children.length > 0 : false;

  const handleToggleClick = () => {
    onToggleClick(node.id);
  };

  const handleSelectNodeClick: React.MouseEventHandler<HTMLDivElement> =
    useCallback(
      (event) => {
        if (event.type !== "click") return;

        onSelectClick(node.id);
      },
      [node.id, onSelectClick]
    );

  return (
    <li
      role="treeitem"
      aria-expanded={isOpen}
      aria-selected={isSelected}
      style={{ listStyle: "none" }}
      tabIndex={isSelected ? 0 : -1}
    >
      <ListItemButton
        selected={isSelected}
        onClick={handleSelectNodeClick}
        sx={{ pl: node.level * 2 }}
      >
        {hasChildren ? (
          <TreeNodeItemIcon onClick={handleToggleClick}>
            {isOpen ? <ExpandMore /> : <ExpandLess />}
          </TreeNodeItemIcon>
        ) : (
          <TreeNodeItemIcon />
        )}
        <ListItemText primary={node.label} />
      </ListItemButton>

      {hasChildren ? (
        <Collapse
          in={isOpen}
          timeout="auto"
          unmountOnExit
          component="ul"
          sx={{ pl: node.level * 2 }}
        >
          {node.children!.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              onToggleClick={onToggleClick}
              isOpenedFn={isOpenedFn}
              onSelectClick={onSelectClick}
              isSelectedFn={isSelectedFn}
            />
          ))}
        </Collapse>
      ) : null}
    </li>
  );
};

export default TreeNode;
