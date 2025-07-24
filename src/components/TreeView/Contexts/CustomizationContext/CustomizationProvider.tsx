import { CustomizationContext } from "@/components/TreeView/Contexts/CustomizationContext";
import type { CustomizationContextType } from "@/components/TreeView/Contexts/CustomizationContext/types/CustomizationContextType";
import type { CustomizationProviderProps } from "@/components/TreeView/Contexts/CustomizationContext/types/CustomizationProviderProps";

const CustomizationProvider = ({
  children,
  slots,
  slotProps,
  renderStartIcon,
  renderLabel,
}: CustomizationProviderProps) => (
  <CustomizationContext.Provider
    value={
      {
        slots,
        slotProps,
        renderStartIcon,
        renderLabel,
      } as unknown as CustomizationContextType
    }
  >
    {children}
  </CustomizationContext.Provider>
);

export default CustomizationProvider;
