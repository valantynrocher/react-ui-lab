import type { TreeNodeType } from "@/components/TreeView/types";
import { createContext } from "react";
import type { TreeViewInteractionContextProps } from "./props";

export type TreeViewInteractionContextState = {
  openedIds: Set<string>;
  visibleNodes: TreeNodeType[];
  treeData: TreeViewInteractionContextProps["treeData"];
};

export type TreeViewInteractionContextActions = {
  toggleNode: (id: string) => void;
  isOpenedFn: (id: string) => boolean;
  selectNode: (id: string) => void;
  isSelectedFn: (id: string) => boolean;
  handleKeyDown: (event: React.KeyboardEvent) => void;
};

export type TreeViewInteractionContextValue = TreeViewInteractionContextState &
  TreeViewInteractionContextActions;

const TreeViewInteractionContext = createContext<
  TreeViewInteractionContextValue | undefined
>(undefined);

export default TreeViewInteractionContext;
