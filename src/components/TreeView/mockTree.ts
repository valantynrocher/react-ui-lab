import type { TreeNodeType } from "@/components/TreeView/types";

export const mockTreeData: TreeNodeType[] = [
  {
    id: "1",
    label: "Root 1",
    level: 0,
    children: [
      {
        id: "1-1",
        label: "Child 1-1",
        level: 1,
        children: [
          {
            id: "1-1-1",
            label: "Child 1-1-1",
            level: 2,
            children: [
              {
                id: "1-1-1-1",
                label: "Child 1-1-1-1",
                level: 3,
                children: [
                  {
                    id: "1-1-1-1-1",
                    label: "Child 1-1-1-1-1",
                    level: 4,
                  },
                ],
              },
            ],
          },
          {
            id: "1-1-2",
            label: "Child 1-1-2",
            level: 2,
          },
        ],
      },
      {
        id: "1-2",
        label: "Child 1-2",
        level: 1,
      },
    ],
  },
  {
    id: "2",
    label: "Root 2",
    level: 0,
    children: [
      {
        id: "2-1",
        label: "Child 2-1",
        level: 1,
        children: [
          {
            id: "2-1-1",
            label: "Child 2-1-1",
            level: 2,
            children: [
              {
                id: "2-1-1-1",
                label: "Child 2-1-1-1",
                level: 3,
                children: [
                  {
                    id: "2-1-1-1-1",
                    label: "Child 2-1-1-1-1",
                    level: 4,
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
