import TreeViewInteractionContext from "@/components/TreeView/Contexts/InteractionContext/context";
import useKeyboardInteraction from "@/components/TreeView/Contexts/InteractionContext/hooks/useKeyboardInteraction";
import useOpenCloseInteraction from "@/components/TreeView/Contexts/InteractionContext/hooks/useOpenCloseInteraction";
import type { TreeViewInteractionContextProps } from "@/components/TreeView/Contexts/InteractionContext/props";

const InteractionContextProvider = ({
  children,
  defaultSelectedId,
  defaultOpenedIds,
  treeData,
}: TreeViewInteractionContextProps) => {
  const { openedIds, toggleNode, isOpenedFn, visibleNodes } =
    useOpenCloseInteraction({
      treeData,
      defaultOpenedIds,
    });

  const { isSelectedFn, handleKeyDown, selectNode } = useKeyboardInteraction({
    defaultSelectedId,
    visibleNodes,
    openedIds,
    toggleNode,
  });

  return (
    <TreeViewInteractionContext.Provider
      value={{
        openedIds,
        visibleNodes,
        toggleNode,
        isOpenedFn,
        selectNode,
        isSelectedFn,
        handleKeyDown,
        treeData,
      }}
    >
      {children}
    </TreeViewInteractionContext.Provider>
  );
};

export default InteractionContextProvider;
