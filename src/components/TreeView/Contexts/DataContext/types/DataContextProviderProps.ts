import type {
  OptionsWithExternalDataType,
  OptionsWithInternalData,
} from "@/components/TreeView/types/TreeViewOptions";
import { type PropsWithChildren } from "react";

export type DataProviderInternalDataProps =
  PropsWithChildren<OptionsWithInternalData>;

export type DataProviderExternalDataProps<Node> = PropsWithChildren<
  OptionsWithExternalDataType<Node>
>;
