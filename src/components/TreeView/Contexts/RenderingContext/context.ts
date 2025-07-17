import type { TreeViewRenderingContextProps } from "@/components/TreeView/Contexts/RenderingContext/props";
import { createContext } from "react";

const TreeViewRenderingContext = createContext<
  TreeViewRenderingContextProps | undefined
>(undefined);

export default TreeViewRenderingContext;
