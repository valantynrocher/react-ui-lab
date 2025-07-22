export type TraverseCallback<T extends { children?: T[] }> = (
  node: T,
  parent?: T
) => void;

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

const createTraverseTree =
  <T extends { children?: T[] }>(callback: TraverseCallback<T>) =>
  (tree: T[], parent?: T) => {
    const _traverse = createTraverseTree(callback);
    for (const node of tree) {
      callback(node, parent);
      if (node.children) {
        _traverse(node.children, node);
      }
    }
  };

export default traverseTree;
export { createTraverseTree };
