import { TreeViewRenderingContext } from "@/components/TreeView/Contexts/RenderingContext";
import type { TreeViewRenderingProviderProps } from "./props";
import type {
  DefaultTreeViewSlots,
  TreeViewRenderingContextValue,
  TreeViewSlots,
} from "@/components/TreeView/Contexts/RenderingContext/context";

const TreeViewRenderingProvider = <
  S extends TreeViewSlots = DefaultTreeViewSlots
>({
  children,
  slots,
  slotProps,
  renderStartIcon,
  renderLabel,
}: TreeViewRenderingProviderProps<S>) => {
  return (
    <TreeViewRenderingContext.Provider
      value={
        {
          slots,
          slotProps,
          renderStartIcon,
          renderLabel,
        } as unknown as TreeViewRenderingContextValue
      }
    >
      {children}
    </TreeViewRenderingContext.Provider>
  );
};

export default TreeViewRenderingProvider;
