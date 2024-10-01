import { Button } from "@/components/ui/button";
import { verifyInvitationToken } from "@/lib/token";
import { Frown } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import InvitationScreen from "../_component/InvitationScreen";

const AcceptInvitationPage = async ({
  params,
}: {
  params: { token: string };
}) => {
  const { token } = params;
  console.log(!token);

  if (!token) redirect("/");

  const invitation = await verifyInvitationToken(token);

  // Invalid invitation
  if (!invitation.success || !invitation.data) {
    return (
      <div className="bg-accent p-4  sm:p-6 rounded-md border border-primary/50 flex flex-col justify-between items-center gap-6 min-h-[350px]">
        <div className="flex flex-col justify-center items-center">
          <Frown className="w-44 h-44 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-5">
            This invite may be expired, or you might not have permission to join
          </p>
        </div>
        <div className="w-full">
          <Button className="mb-2 w-full">Continue to SprintMaven</Button>
          <Button className="px-0" variant="link">
            <Link className="text-sm " href="/">
              Why is my invite Invalid?
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Valid Invitation and signed in
  if (invitation && invitation.data) {
    return <InvitationScreen invitation={invitation.data} />;
  }

  return <div>{token}</div>;
};

export default AcceptInvitationPage;
