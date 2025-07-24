import { CustomizationProvider } from "@/components/TreeView/Contexts/CustomizationContext";
import type { CustomizationProviderProps } from "@/components/TreeView/Contexts/CustomizationContext/types/CustomizationProviderProps";
import {
  DataProviderExternalData,
  DataProviderInternalData,
} from "@/components/TreeView/Contexts/DataContext";
import { ExpansionProvider } from "@/components/TreeView/Contexts/ExpansionContext";
import type { ExpansionProviderProps } from "@/components/TreeView/Contexts/ExpansionContext/types/ExpansionProviderProps";
import { KeyboardProvider } from "@/components/TreeView/Contexts/KeyboardContext";
import { SelectionProvider } from "@/components/TreeView/Contexts/SelectionContext";
import type { SelectionProviderProps } from "@/components/TreeView/Contexts/SelectionContext/types/SelectionProviderProps";
import Tree from "@/components/TreeView/Tree";
import type {
  OptionsWithExternalDataType,
  TreeViewOptions,
} from "@/components/TreeView/types/TreeViewOptions";
import type { NodeRequiredShape } from "@/components/TreeView/types/nodes";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";

/** Type guard */
function isDataExternal<Node>(
  options: TreeViewOptions<Node>
): options is OptionsWithExternalDataType<Node> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof (options as any).mapToInternal === "function";
}

const splitProps = <Node extends unknown | NodeRequiredShape>({
  defaultSelectedId = "",
  defaultExpandedIds = [],
  slots,
  slotProps,
  renderStartIcon,
  renderLabel,
  onSelectionClick,
  onExpansionClick,
  expandedIds,
  selectedId,
}: TreeViewOptions<Node>): {
  expansionProviderProps: Omit<ExpansionProviderProps, "children">;
  selectionProviderProps: Omit<SelectionProviderProps, "children">;
  customizationProviderProps: Omit<CustomizationProviderProps, "children">;
} => ({
  customizationProviderProps: {
    renderLabel,
    renderStartIcon,
    slotProps: {
      CollapseIcon: slotProps?.CollapseIcon || {},
      ExpandIcon: slotProps?.ExpandIcon || {},
    },
    slots: {
      CollapseIcon: slots?.CollapseIcon || ExpandLess,
      ExpandIcon: slots?.ExpandIcon || ExpandMore,
    },
  },
  expansionProviderProps: {
    defaultExpandedIds,
    expandedIds,
    onExpansionClick,
  },
  selectionProviderProps: { defaultSelectedId, onSelectionClick, selectedId },
});

const TreeView = (props: TreeViewOptions) => {
  const {
    customizationProviderProps,
    expansionProviderProps,
    selectionProviderProps,
  } = splitProps(props);
  const renderingContext = (
    <CustomizationProvider {...customizationProviderProps}>
      <ExpansionProvider {...expansionProviderProps}>
        <SelectionProvider {...selectionProviderProps}>
          <KeyboardProvider>
            <Stack alignItems="center">
              <Tree />
            </Stack>
          </KeyboardProvider>
        </SelectionProvider>
      </ExpansionProvider>
    </CustomizationProvider>
  );

  if (isDataExternal(props)) {
    const { nodes, mapToInternal } = props;
    return (
      <DataProviderExternalData nodes={nodes} mapToInternal={mapToInternal}>
        {renderingContext}
      </DataProviderExternalData>
    );
  }

  return (
    <DataProviderInternalData nodes={props.nodes}>
      {renderingContext}
    </DataProviderInternalData>
  );
};

export default TreeView;
