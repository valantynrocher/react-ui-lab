import { CustomizationProvider } from "@/components/TreeView/Contexts/CustomizationContext";
import type { CustomizationProviderProps } from "@/components/TreeView/Contexts/CustomizationContext/types/CustomizationProviderProps";
import { DataProvider } from "@/components/TreeView/Contexts/DataContext";
import { ExpansionProvider } from "@/components/TreeView/Contexts/ExpansionContext";
import type { ExpansionProviderProps } from "@/components/TreeView/Contexts/ExpansionContext/types/ExpansionProviderProps";
import { KeyboardProvider } from "@/components/TreeView/Contexts/KeyboardContext";
import { SelectionProvider } from "@/components/TreeView/Contexts/SelectionContext";
import type { SelectionProviderProps } from "@/components/TreeView/Contexts/SelectionContext/types/SelectionProviderProps";
import Tree from "@/components/TreeView/Tree";
import type { TreeViewOptions } from "@/components/TreeView/types/TreeViewOptions";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";

const splitProps = ({
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
}: TreeViewOptions): {
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
  selectionProviderProps: {
    defaultSelectedId,
    onSelectionClick,
    selectedId,
  },
});

const TreeView = (props: TreeViewOptions) => {
  const {
    customizationProviderProps,
    expansionProviderProps,
    selectionProviderProps,
  } = splitProps(props);

  return (
    <DataProvider nodes={props.nodes}>
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
    </DataProvider>
  );
};

export default TreeView;
