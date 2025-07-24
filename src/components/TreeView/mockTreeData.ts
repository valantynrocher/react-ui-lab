import type { InternalNode } from "@/components/TreeView/types/nodes";

export const simpleTreeData: InternalNode[] = [
  {
    id: "1",
    label: "Root A",
    level: 0,
    type: "root",
    children: [
      {
        id: "1-1",
        label: "Child A1",
        level: 1,
        parentId: "1",
        type: "end",
      },
      {
        id: "1-2",
        label: "Child A2",
        level: 1,
        parentId: "1",
        type: "end",
      },
    ],
  },
  {
    id: "2",
    label: "Root B",
    level: 0,
    type: "root",
    children: [
      {
        id: "2-1",
        label: "Child B1",
        level: 1,
        parentId: "2",
        type: "end",
      },
    ],
  },
];

export const deepTreeData: InternalNode[] = [
  {
    id: "1",
    label: "Root",
    level: 0,
    type: "root",
    children: [
      {
        id: "1-1",
        label: "Level 1",
        level: 1,
        parentId: "root-1",
        type: "child",
        children: [
          {
            id: "1-1-1",
            label: "Level 2",
            level: 2,
            parentId: "1-1",
            type: "child",
            children: [
              {
                id: "1-1-1-1",
                label: "Level 3",
                level: 3,
                parentId: "1-1-1",
                type: "child",
                children: [
                  {
                    id: "1-1-1-1-1",
                    label: "Level 4 (Leaf)",
                    level: 4,
                    parentId: "1-1-1-1",
                    type: "end",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
