import type { TreeViewOptions } from "@/components/TreeView/types/TreeViewOptions";
import type { PropsWithChildren } from "react";

export type SelectionProviderProps = PropsWithChildren<
  Pick<
    TreeViewOptions,
    "defaultSelectedIds" | "selectedIds" | "onSelectionClick" | "multiSelection"
  >
>;
