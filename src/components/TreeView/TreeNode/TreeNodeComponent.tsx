import { TreeViewInteractionHooks } from "@/components/TreeView/Contexts/InteractionContext";
import { useTreeViewRenderingContext } from "@/components/TreeView/Contexts/RenderingContext";
import TreeNodeToggler from "@/components/TreeView/TreeNode/TreeNodeToggler";
import type { TreeNodeProps } from "@/components/TreeView/TreeNode/props";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useCallback } from "react";

const TreeNode = ({ node }: TreeNodeProps) => {
  const { renderLabel, renderStartIcon } = useTreeViewRenderingContext();
  const { toggleNode, isOpenedFn } =
    TreeViewInteractionHooks.useExpansionInteraction();
  const { selectNode, isSelectedFn } =
    TreeViewInteractionHooks.useSelectionInteraction();

  const isOpen = isOpenedFn(node.id);
  const isSelected = isSelectedFn(node.id);
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  const handleToggleClick = useCallback(() => {
    toggleNode(node.id);
  }, [node.id, toggleNode]);

  const handleSelectClick: React.MouseEventHandler<HTMLDivElement> =
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
      aria-expanded={isOpen}
      aria-selected={isSelected}
      style={{ listStyle: "none" }}
      tabIndex={isSelected ? 0 : -1}
      aria-level={node.level + 1}
    >
      <ListItemButton
        selected={isSelected}
        onClick={handleSelectClick}
        sx={{ pl: node.level * 2 }}
      >
        <TreeNodeToggler
          onClick={handleToggleClick}
          hasChildren={hasChildren}
          isOpen={isOpen}
        />
        {renderStartIcon ? renderStartIcon(node) : null}
        <ListItemText primary={renderLabel ? renderLabel(node) : node.label} />
      </ListItemButton>

      {hasChildren ? (
        <Collapse
          in={isOpen}
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
