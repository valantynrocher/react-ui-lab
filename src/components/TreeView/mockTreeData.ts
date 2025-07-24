export const simpleTreeData = [
  {
    id: "1",
    label: "Root A",
    children: [
      {
        id: "1-1",
        label: "Child A1",
      },
      {
        id: "1-2",
        label: "Child A2",
      },
    ],
  },
  {
    id: "2",
    label: "Root B",
    children: [
      {
        id: "2-1",
        label: "Child B1",
      },
    ],
  },
];

export const deepTreeData = [
  {
    id: "1",
    label: "Root A",
    children: [
      {
        id: "1-1",
        label: "Level 1",
        children: [
          {
            id: "1-1-1",
            label: "Level 2",
            children: [
              {
                id: "1-1-1-1",
                label: "Level 3",
                children: [
                  {
                    id: "1-1-1-1-1",
                    label: "Level 4 (Leaf)",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "Root B",
    children: [
      {
        id: "2-1",
        label: "Level 1",
        children: [
          {
            id: "2-1-1",
            label: "Level 2",
            children: [
              {
                id: "2-1-1-1",
                label: "Level 3",
                children: [
                  {
                    id: "2-1-1-1-1",
                    label: "Level 4 (Leaf)",
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
