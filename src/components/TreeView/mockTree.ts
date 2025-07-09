import type { TreeNode } from "./types";

export const mockTreeData: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      {
        id: "1-1",
        label: "Projets",
        children: [
          {
            id: "1-1-1",
            label: "react-ui-lab",
            children: [
              {
                id: "1-1-1-1",
                label: "TreeView",
                children: [
                  {
                    id: "1-1-1-1-1",
                    label: "TreeNode.tsx",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "1-2",
        label: "Notes.txt",
      },
    ],
  },
  {
    id: "2",
    label: "Images",
    children: [
      {
        id: "2-1",
        label: "Vacances",
      },
    ],
  },
];
