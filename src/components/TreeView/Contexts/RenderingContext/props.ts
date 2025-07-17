import type { TreeNodeType } from "@/components/TreeView/types";
import type { SvgIconProps } from "@mui/material/SvgIcon";

type TreeNodeSlotNames = "expandIcon" | "collapseIcon";

export type TreeViewSlots = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in TreeNodeSlotNames]?: React.ComponentType<any>;
};

export type InferSlotProps<S extends TreeViewSlots> = {
  [K in keyof S]?: S[K] extends React.ComponentType<infer P> ? P : never;
};

export type DefaultTreeViewSlots = {
  expandIcon: React.ComponentType<SvgIconProps>;
  collapseIcon: React.ComponentType<SvgIconProps>;
};

export type TreeViewRenderingContextProps<
  S extends TreeViewSlots = DefaultTreeViewSlots
> = {
  slots?: S;
  slotProps?: InferSlotProps<S>;
  renderStartIcon?: (node: TreeNodeType) => React.ReactNode;
  renderLabel?: (node: TreeNodeType) => React.ReactNode;
};
