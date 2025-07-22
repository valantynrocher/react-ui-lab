import type {
  TreeViewSlots,
  DefaultTreeViewSlots,
  TreeViewRenderingContextValue,
} from "@/components/TreeView/Contexts/RenderingContext/context";

export interface TreeViewRenderingProviderProps<
  S extends TreeViewSlots = DefaultTreeViewSlots
> extends TreeViewRenderingContextValue<S> {
  children: React.ReactNode;
}
