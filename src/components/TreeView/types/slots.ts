import type { SvgIconProps } from "@mui/material/SvgIcon";

type SlotNames = "ExpandIcon" | "CollapseIcon";

export type ExternalSlots = {
  [K in SlotNames]?: React.ComponentType<object>;
};

export type InferExternalSlotProps<S extends ExternalSlots> = {
  [K in keyof S]?: S[K] extends React.ComponentType<infer P> ? P : never;
};

export type InternalSlots = {
  [K in SlotNames]: React.ComponentType<SvgIconProps>;
};

export type InternalSlotProps = {
  [K in keyof InternalSlots]: InternalSlots[K] extends React.ComponentType<
    infer P
  >
    ? P
    : never;
};

export type DefaultSlots = {
  ExpandIcon: React.ComponentType<SvgIconProps>;
  CollapseIcon: React.ComponentType<SvgIconProps>;
};
