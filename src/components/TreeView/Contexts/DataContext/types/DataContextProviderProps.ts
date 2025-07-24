import type { TreeViewOptions } from "@/components/TreeView/types/TreeViewOptions";
import { type PropsWithChildren } from "react";

export type DataProviderProps = PropsWithChildren<
  Pick<
    TreeViewOptions,
    "nodes" | "getNodeChildren" | "getNodeId" | "getNodeLabel"
  >
>;
