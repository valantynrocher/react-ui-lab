import type { UseKeyboardInteractionOutput } from "@/components/TreeView/hooks/useKeyboardInteraction";
import type { UseOpenCloseInteractionOutput } from "@/components/TreeView/hooks/useOpenCloseInteraction";
import type { TreeNodeType } from "@/components/TreeView/types";

export interface TreeNodeProps
  extends Pick<UseOpenCloseInteractionOutput, "isOpenedFn" | "toggleNode">,
    Pick<UseKeyboardInteractionOutput, "isSelectedFn" | "selectNode"> {
  node: TreeNodeType;
}
