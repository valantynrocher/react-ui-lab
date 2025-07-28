import { useCustomizationContext } from "@/components/TreeView/Contexts/CustomizationContext";
import { useExpansionContext } from "@/components/TreeView/Contexts/ExpansionContext";
import { useSelectionContext } from "@/components/TreeView/Contexts/SelectionContext";
import TreeNodeToggler from "@/components/TreeView/TreeNode/TreeNodeToggler";
import type { TreeNodeProps } from "@/components/TreeView/TreeNode/props";
import useNodeMeta from "@/components/TreeView/hooks/useNodeMeta";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useCallback } from "react";

const TreeNode = ({ node }: TreeNodeProps) => {
  const { renderLabel, renderStartIcon } = useCustomizationContext();
  const { toggleExpansion } = useExpansionContext();
  const { selectNode, multiSelection, isFocusedFn } = useSelectionContext();
  const { id, label, level, children, _hasChildren } = node;
  const [getNodeMeta] = useNodeMeta();
  const { _isExpanded, _isSelected } = getNodeMeta(node);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.type !== "click") return;

      selectNode(id, event);

      const shouldToggleExpansion = !multiSelection && _hasChildren;
      if (shouldToggleExpansion) toggleExpansion(id);
    },
    [_hasChildren, id, multiSelection, selectNode, toggleExpansion]
  );

  const handleContextMenu = (event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      handleNodeClick(event);
    }
  };

  return (
    <li
      role="treeitem"
      style={{ listStyle: "none" }}
      aria-current={isFocusedFn(id) ? "true" : undefined}
      aria-expanded={_isExpanded}
      aria-selected={_isSelected}
      tabIndex={_isSelected ? 0 : -1}
      aria-level={level + 1}
    >
      <ListItemButton
        selected={_isSelected}
        onClick={handleNodeClick}
        sx={(theme) => ({
          pl: level * 2,
          backgroundColor: isFocusedFn(id)
            ? theme.palette.action.focus
            : "initial",
        })}
        onContextMenu={handleContextMenu}
      >
        <TreeNodeToggler
          id={id}
          hasChildren={_hasChildren}
          isExpanded={_isExpanded}
        />

        {renderStartIcon?.(node) ?? null}

        <ListItemText primary={renderLabel?.(node) ?? label} />
      </ListItemButton>

      {_hasChildren ? (
        <Collapse
          in={_isExpanded}
          timeout="auto"
          unmountOnExit
          component="ul"
          sx={{ pl: level * 2 }}
          role="group"
        >
          {children?.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} />
          ))}
        </Collapse>
      ) : null}
    </li>
  );
};

export default TreeNode;
