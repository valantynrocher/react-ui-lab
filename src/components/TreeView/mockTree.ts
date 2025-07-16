import type { TreeNodeType } from "@/components/TreeView/types";

export const mockTreeData: TreeNodeType[] = [
  {
    id: "1",
    label: "Root 1",
    level: 0,
    type: "root",
    children: [
      {
        id: "1-1",
        label: "Child lvl 1",
        level: 1,
        type: "child",
        parentId: "1",
        children: [
          {
            id: "1-1-1",
            label: "Child lvl 2",
            level: 2,
            type: "child",
            parentId: "1-1",
            children: [
              {
                id: "1-1-1-1",
                label: "Child lvl 3",
                level: 3,
                type: "child",
                parentId: "1-1-1",
                children: [
                  {
                    id: "1-1-1-1-1",
                    label: "End lvl 4",
                    level: 4,
                    type: "end",
                    parentId: "1-1-1-1",
                  },
                ],
              },
            ],
          },
          {
            id: "1-1-2",
            label: "Child lvl 2",
            level: 2,
            type: "child",
            parentId: "1-1",
          },
        ],
      },
      {
        id: "1-2",
        label: "Child lvl 1",
        level: 1,
        type: "child",
        parentId: "1",
      },
    ],
  },
  {
    id: "2",
    label: "Root 2",
    level: 0,
    type: "root",
    children: [
      {
        id: "2-1",
        label: "Child lvl 1",
        level: 1,
        type: "child",
        parentId: "2",
        children: [
          {
            id: "2-1-1",
            label: "Child lvl 2",
            level: 2,
            type: "child",
            parentId: "2-1",
            children: [
              {
                id: "2-1-1-1",
                label: "Child lvl 3",
                level: 3,
                type: "child",
                parentId: "2-1-1",
                children: [
                  {
                    id: "2-1-1-1-1",
                    label: "End lvl 4",
                    level: 4,
                    type: "end",
                    parentId: "2-1-1-1",
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
