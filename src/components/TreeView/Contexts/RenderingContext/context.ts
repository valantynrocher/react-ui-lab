import { createContext } from "react";
import type { TreeNodeType } from "@/components/TreeView/types";
import type { SvgIconProps } from "@mui/material/SvgIcon";

type TreeNodeSlotNames = "ExpandIcon" | "CollapseIcon";

export type TreeViewSlots = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in TreeNodeSlotNames]?: React.ComponentType<any>;
};

export type InferSlotProps<S extends TreeViewSlots> = {
  [K in keyof S]?: S[K] extends React.ComponentType<infer P> ? P : never;
};

export type DefaultTreeViewSlots = {
  ExpandIcon: React.ComponentType<SvgIconProps>;
  CollapseIcon: React.ComponentType<SvgIconProps>;
};

export type TreeViewRenderingContextValue<
  S extends TreeViewSlots = DefaultTreeViewSlots
> = {
  /**
   * Slots to override the default icons used for expanding and collapsing tree nodes.
   */
  slots: S;
  /**
   * Props to pass to the slots defined in `slots`.
   * @default { ExpandIcon: {}, CollapseIcon: {} }
   */
  slotProps: InferSlotProps<S>;
  /**
   * Render function to override the default start icon of a tree node.
   * @param node
   * @returns
   */
  renderStartIcon?: (node: TreeNodeType) => React.ReactNode;
  /**
   * Render function to override the default label of a tree node.
   * @param node
   * @returns
   */
  renderLabel?: (node: TreeNodeType) => React.ReactNode;
};

const TreeViewRenderingContext = createContext<
  TreeViewRenderingContextValue | undefined
>(undefined);

export default TreeViewRenderingContext;
