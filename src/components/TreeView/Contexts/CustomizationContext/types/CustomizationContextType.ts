import type {
  InternalSlotProps,
  InternalSlots,
} from "@/components/TreeView/types/slots";
import type { TreeViewOptions } from "@/components/TreeView/types/TreeViewOptions";

export type CustomizationContextType = Pick<
  TreeViewOptions,
  "renderStartIcon" | "renderLabel"
> & {
  slots: InternalSlots;
  slotProps: InternalSlotProps;
};
