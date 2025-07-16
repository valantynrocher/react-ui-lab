export type TraverseCallback<T> = (node: T, parent?: T) => void;

const traverseTree = <T extends { children?: T[] }>(
  tree: T[],
  callback: TraverseCallback<T>,
  parent?: T
): void => {
  for (const node of tree) {
    callback(node, parent);
    if (node.children) {
      traverseTree(node.children, callback, node);
    }
  }
};

export default traverseTree;
