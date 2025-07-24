import type { TreeViewOptions } from "@/components/TreeView/types/TreeViewOptions";
import type { PropsWithChildren } from "react";

export type ExpansionProviderProps = PropsWithChildren<
  Pick<
    TreeViewOptions,
    "defaultExpandedIds" | "expandedIds" | "onExpansionClick"
  >
>;
