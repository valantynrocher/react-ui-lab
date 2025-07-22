import TreeViewInteractionContext, {
  type TreeViewInteractionContextActions,
  type TreeViewInteractionContextState,
} from "@/components/TreeView/Contexts/InteractionContext/context";
import { useContext } from "react";

export const useInteractionState = (): TreeViewInteractionContextState => {
  const ctx = useContext(TreeViewInteractionContext);
  if (!ctx)
    throw new Error(
      "useInteractionState must be used within a TreeViewInteractionContextProvider"
    );
  return {
    openedIds: ctx.openedIds,
    visibleNodes: ctx.visibleNodes,
    treeData: ctx.treeData,
  };
};

export const useExpansionInteraction = (): Pick<
  TreeViewInteractionContextActions,
  "toggleNode" | "isOpenedFn"
> => {
  const ctx = useContext(TreeViewInteractionContext);
  if (!ctx)
    throw new Error(
      "useNodeExpansion must be used within a TreeViewInteractionContextProvider"
    );

  return {
    toggleNode: ctx.toggleNode,
    isOpenedFn: ctx.isOpenedFn,
  };
};

export const useSelectionInteraction = (): Pick<
  TreeViewInteractionContextActions,
  "selectNode" | "isSelectedFn"
> => {
  const ctx = useContext(TreeViewInteractionContext);
  if (!ctx)
    throw new Error(
      "useNodeSelection must be used within a TreeViewInteractionContextProvider"
    );

  return {
    selectNode: ctx.selectNode,
    isSelectedFn: ctx.isSelectedFn,
  };
};

export const useKeyboardInteraction = (): Pick<
  TreeViewInteractionContextActions,
  "handleKeyDown"
> => {
  const ctx = useContext(TreeViewInteractionContext);
  if (!ctx)
    throw new Error(
      "useKeyboardNavigation must be used within a TreeViewInteractionContextProvider"
    );

  return {
    handleKeyDown: ctx.handleKeyDown,
  };
};
