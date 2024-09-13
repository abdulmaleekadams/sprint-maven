import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
const GoogleButton = ({ buttonText }: { buttonText: string }) => {
  const searchParams = useSearchParams();

  const callbackQuery = searchParams.get("callbackUrl") || "/";
  const GoogleAuth = () => {
    return signIn("google", {
      callbackUrl: callbackQuery,
    });
  };

  return (
    <Button
      variant="outline"
      onClick={async () => {
        const res = GoogleAuth();
        console.log(res);
      }}
      className="relative gap-3"
    >
      <FcGoogle size={20} className="" />
      {buttonText}
    </Button>
  );
};

export default GoogleButton;
