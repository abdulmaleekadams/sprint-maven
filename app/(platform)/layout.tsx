import ModalProvider from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <Toaster duration={2000} position="top-center" />
      <ModalProvider />
      {children}
    </QueryProvider>
  );
};

export default PlatformLayout;
