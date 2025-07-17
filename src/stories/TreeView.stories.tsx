import type { Meta, StoryObj } from "@storybook/react-vite";
import TreeView from "@/components/TreeView";
import {
  simpleTreeData,
  deepTreeData,
} from "@/components/TreeView/mockTreeData";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import LabelImportantOutlineIcon from "@mui/icons-material/LabelImportantOutline";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Lab/TreeView",
  component: TreeView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SimpleTreeView: Story = {
  args: {
    treeData: simpleTreeData,
    initialSelectedId: "",
    initialOpenedIds: ["1"],
  },
};

export const DeepTreeView: Story = {
  args: {
    treeData: deepTreeData,
    initialSelectedId: "",
    initialOpenedIds: ["1", "1-1", "1-1-1"],
  },
};

export const CustomOpenCloseIcons: Story = {
  args: {
    treeData: simpleTreeData,
    initialSelectedId: "",
    slots: {
      expandIcon: AddBoxOutlinedIcon,
      collapseIcon: IndeterminateCheckBoxOutlinedIcon,
    },
    slotProps: {
      expandIcon: {
        color: "primary",
      },
      collapseIcon: {
        color: "secondary",
      },
    },
    initialOpenedIds: ["1"],
  },
};

export const CustomLabel: Story = {
  args: {
    treeData: simpleTreeData,
    initialSelectedId: "",
    initialOpenedIds: ["1"],
    renderLabel: (node) => {
      return (
        <code
          style={{
            padding: 4,
            borderRadius: 5,
            backgroundColor: "lightgray",
          }}
        >
          {node.label}
        </code>
      );
    },
  },
};

export const CustomStartIcon: Story = {
  args: {
    treeData: simpleTreeData,
    initialSelectedId: "",
    initialOpenedIds: ["1"],
    renderStartIcon: (node) => {
      return node.type === "end" ? <LabelImportantOutlineIcon /> : <></>;
    },
  },
};
