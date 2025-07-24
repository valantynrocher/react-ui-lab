/* eslint-disable @typescript-eslint/no-explicit-any */
import TreeView from "@/components/TreeView";
import {
  deepTreeData,
  simpleTreeData,
} from "@/components/TreeView/mockTreeData";
import type { InternalNode } from "@/components/TreeView/types/nodes";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import LabelImportantOutlineIcon from "@mui/icons-material/LabelImportantOutline";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

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
  argTypes: {
    renderLabel: fn(),
    renderStartIcon: fn(),
    nodes: {
      control: "object",
      description: "Data structure representing the tree",
    },
    defaultExpandedIds: {
      control: "text",
      description: "Array of IDs of initially opened nodes",
    },
    defaultSelectedId: {
      control: "text",
      description: "ID of the initially selected node",
    },
    slots: {
      control: "object",
      description: "Custom slots for tree node icons",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SimpleTreeView: Story = {
  args: {
    nodes: simpleTreeData,
    defaultSelectedId: "",
    defaultExpandedIds: ["1"],
  },
};

export const DeepTreeView: Story = {
  args: {
    nodes: deepTreeData,
    defaultSelectedId: "",
    defaultExpandedIds: ["1", "1-1", "1-1-1"],
  },
};

export const CustomOpenCloseIcons: Story = {
  args: {
    nodes: simpleTreeData,
    defaultSelectedId: "",
    slots: {
      ExpandIcon: AddBoxOutlinedIcon,
      CollapseIcon: IndeterminateCheckBoxOutlinedIcon,
    },
    slotProps: {
      ExpandIcon: {
        color: "primary",
      },
      CollapseIcon: {
        color: "secondary",
      },
    },
    defaultExpandedIds: ["1"],
  },
};

export const CustomLabel: Story = {
  args: {
    nodes: simpleTreeData,
    defaultSelectedId: "",
    defaultExpandedIds: ["1"],
    renderLabel: (node: InternalNode) => {
      return (
        <code
          style={{
            padding: 4,
            borderRadius: 5,
            backgroundColor: "lightgray",
          }}
        >
          {(node as any).label}
        </code>
      );
    },
  },
};

export const CustomStartIcon: Story = {
  args: {
    nodes: simpleTreeData,
    defaultSelectedId: "",
    defaultExpandedIds: ["1"],
    renderStartIcon: (node: InternalNode) => {
      return node.type === "end" ? <LabelImportantOutlineIcon /> : <></>;
    },
  },
};
