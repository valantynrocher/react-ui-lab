export type AllowedEventKeys =
  | "ArrowDown"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowLeft"
  | "Enter"
  | " "; // for space key

const allowedKeyMap: Record<AllowedEventKeys, true> = {
  ArrowDown: true,
  ArrowUp: true,
  ArrowRight: true,
  ArrowLeft: true,
  Enter: true,
  " ": true,
};

const isAllowedEventKey = (key: string): key is AllowedEventKeys =>
  key in allowedKeyMap;

export default isAllowedEventKey;
