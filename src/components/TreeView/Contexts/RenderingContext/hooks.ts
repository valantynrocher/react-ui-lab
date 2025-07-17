import TreeViewRenderingContext from "./context";
import { useContext } from "react";

const useTreeViewRenderingContext = () => {
  const context = useContext(TreeViewRenderingContext);
  if (!context)
    throw new Error(
      "useTreeViewRenderingContext must be used within a TreeViewRenderingProvider"
    );
  return context;
};

export default useTreeViewRenderingContext;
