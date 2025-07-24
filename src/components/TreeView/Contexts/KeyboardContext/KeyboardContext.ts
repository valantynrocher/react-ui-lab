import type { KeyboardContextType } from "@/components/TreeView/Contexts/KeyboardContext/types/KeyboardContextType";
import { createContext } from "react";

const KeyboardContext = createContext<KeyboardContextType | null>(null);

export default KeyboardContext;
