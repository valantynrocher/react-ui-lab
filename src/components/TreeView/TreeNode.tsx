import type { TreeNodeId, TreeNodeType } from "@/components/TreeView/types";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type TreeNodeProps = {
  node: TreeNodeType;
  isExpanded: (id: TreeNodeId) => boolean;
  isSelected: (id: TreeNodeId) => boolean;
  onToggleExpand: (id: TreeNodeId) => void;
  onSelect: (id: TreeNodeId) => void;
};

const TreeNode = (props: TreeNodeProps) => {
  const { node, onToggleExpand, isExpanded, onSelect, isSelected } = props;

  const open = isExpanded(node.id);
  const selected = isSelected(node.id);
  const hasChildren = node.children ? node.children.length > 0 : false;

  const handleToggle = () => {
    onToggleExpand(node.id);
  };

  const handleSelect = () => {
    onSelect(node.id);
  };

  return (
    <li
      role="treeitem"
      aria-expanded={open}
      aria-selected={selected}
      style={{ listStyle: "none" }}
    >
      <ListItemButton
        selected={selected}
        onClick={handleSelect}
        sx={{ pl: node.level * 2 }}
      >
        <ListItemIcon
          onClick={hasChildren ? handleToggle : undefined}
          sx={{ minWidth: 24 }}
        >
          {hasChildren ? open ? <ExpandMore /> : <ChevronRight /> : null}
        </ListItemIcon>
        <ListItemText primary={node.label} />
      </ListItemButton>

      {hasChildren ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {node.children!.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              onToggleExpand={onToggleExpand}
              isExpanded={isExpanded}
              onSelect={onSelect}
              isSelected={isSelected}
            />
          ))}
        </Collapse>
      ) : null}
    </li>
  );
};

export default TreeNode;
