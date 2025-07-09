import type { TreeNodeType } from "@/components/TreeView/types";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

type TreeNodeProps = {
  node: TreeNodeType;
};

const TreeNode = (props: TreeNodeProps) => {
  const { node } = props;

  const [open, setOpen] = useState(false);

  const hasChildren = node.children ? node.children.length > 0 : false;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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
            <TreeNode key={childNode.id} node={childNode} />
          ))}
        </Collapse>
      ) : null}
    </>
  );
};

export default TreeNode;
