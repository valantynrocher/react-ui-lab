import { TreeViewRenderingContext } from "@/components/TreeView/Contexts/RenderingContext";
import type {
  DefaultTreeViewSlots,
  TreeViewRenderingContextProps,
  TreeViewSlots,
} from "@/components/TreeView/Contexts/RenderingContext/props";

type TreeViewRenderingProviderProps<
  S extends TreeViewSlots = DefaultTreeViewSlots
> = TreeViewRenderingContextProps<S> & {
  children: React.ReactNode;
};

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
        } as unknown as TreeViewRenderingContextProps
      }
    >
      {children}
    </TreeViewRenderingContext.Provider>
  );
};

export default TreeViewRenderingProvider;
