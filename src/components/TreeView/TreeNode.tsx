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
  onToggle: (id: TreeNodeId) => void;
};

const TreeNode = (props: TreeNodeProps) => {
  const { node, onToggle, isExpanded } = props;

  const open = isExpanded(node.id);

  const hasChildren = node.children ? node.children.length > 0 : false;

  const handleToggle = () => {
    onToggle(node.id);
  };

  return (
    <>
      <ListItemButton
        onClick={hasChildren ? handleToggle : undefined}
        sx={{ pl: node.level * 2 }}
      >
        <ListItemIcon sx={{ color: "inherit", minWidth: 24 }}>
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
              onToggle={onToggle}
              isExpanded={isExpanded}
            />
          ))}
        </Collapse>
      ) : null}
    </>
  );
};

export default TreeNode;
