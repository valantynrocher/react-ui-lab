import type { TreeViewInteractionContextProps } from "@/components/TreeView/Contexts/InteractionContext";
import type {
  TreeViewRenderingContextValue,
  TreeViewRenderingProviderProps,
} from "@/components/TreeView/Contexts/RenderingContext";

export interface TreeViewProps
  extends Omit<
      TreeViewRenderingProviderProps,
      "children" | "slots" | "slotProps"
    >,
    Omit<TreeViewInteractionContextProps, "children"> {
  slots?: TreeViewRenderingContextValue["slots"];
  slotProps?: TreeViewRenderingContextValue["slotProps"];
}
