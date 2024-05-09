import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <Toaster duration={2000} position="bottom-right" />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
