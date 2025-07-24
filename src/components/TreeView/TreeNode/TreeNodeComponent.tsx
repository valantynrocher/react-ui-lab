import { useCustomizationContext } from "@/components/TreeView/Contexts/CustomizationContext";
import { useExpansionContext } from "@/components/TreeView/Contexts/ExpansionContext";
import { useSelectionContext } from "@/components/TreeView/Contexts/SelectionContext";
import TreeNodeToggler from "@/components/TreeView/TreeNode/TreeNodeToggler";
import type { TreeNodeProps } from "@/components/TreeView/TreeNode/props";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useCallback } from "react";

const TreeNode = ({ node }: TreeNodeProps) => {
  const { renderLabel, renderStartIcon } = useCustomizationContext();
  const { toggleExpansion, isExpandedFn } = useExpansionContext();
  const { selectNode, isSelectedFn } = useSelectionContext();

  const isExpanded = isExpandedFn(node.id);
  const isSelected = isSelectedFn(node.id);
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  const handleExpansionClick = useCallback(() => {
    toggleExpansion(node.id);
  }, [node.id, toggleExpansion]);

  const handleSelectionClick: React.MouseEventHandler<HTMLDivElement> =
    useCallback(
      (event) => {
        if (event.type !== "click") return;

        selectNode(node.id);
      },
      [node.id, selectNode]
    );

  return (
    <li
      role="treeitem"
      aria-expanded={isExpanded}
      aria-selected={isSelected}
      style={{ listStyle: "none" }}
      tabIndex={isSelected ? 0 : -1}
      aria-level={node.level + 1}
    >
      <ListItemButton
        selected={isSelected}
        onClick={handleSelectionClick}
        sx={{ pl: node.level * 2 }}
      >
        <TreeNodeToggler
          onClick={handleExpansionClick}
          hasChildren={hasChildren}
          isOpen={isExpanded}
        />
        {renderStartIcon?.(node) ?? null}
        <ListItemText primary={renderLabel?.(node) ?? node.label} />
      </ListItemButton>

      {hasChildren ? (
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          component="ul"
          sx={{ pl: node.level * 2 }}
          role="group"
        >
          {node.children?.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} />
          ))}
        </Collapse>
      ) : null}
    </li>
  );
};

export default TreeNode;
