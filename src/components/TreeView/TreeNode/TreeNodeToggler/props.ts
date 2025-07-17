export interface TreeNodeTogglerProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  hasChildren: boolean;
}
