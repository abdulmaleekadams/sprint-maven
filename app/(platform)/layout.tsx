import ModalProvider from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";
import { OrganizationProvider } from "@/provider/OrganizationContext";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <OrganizationProvider>
        <Toaster duration={2000} position="top-center" />
        <ModalProvider />
        {children}
      </OrganizationProvider>
    </QueryProvider>
  );
};

export default PlatformLayout;
