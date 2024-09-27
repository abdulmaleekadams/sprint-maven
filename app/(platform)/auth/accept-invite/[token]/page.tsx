import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserByEmail } from "@/lib/data";
import { verifyInvitationToken } from "@/lib/token";
import { format, formatDistanceToNow } from "date-fns";
import { Frown } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const AcceptInvitationPage = async ({
  params,
}: {
  params: { token: string };
}) => {
  const { token } = params;
  if (!token) redirect("/");

  const invitation = await verifyInvitationToken(token);

  console.log(invitation);

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
  const {
    data: {
      createdAt,
      email,
      expires,
      workspace: {
        name: workspaceName,
        description: workspaceDescription,
        owner: { name: ownerName },
      },
    },
  } = invitation;

  const userExist = await getUserByEmail(invitation.data?.email!);

  // Valid Invitation and signed in
  if (invitation) {
    return (
      <div className="bg-accent p-4  sm:p-6 rounded-md border border-primary/50 flex flex-col justify-between items-center gap-10 max-w-xl w-full min-h-[500px] shadow-md">
        <div className="w-full">
          <p className="text-sm text-muted-foreground">{`Today ${format(
            new Date(),
            "MMMM dd, yyyy"
          )}`}</p>
          <p className="text-lg mt-1">Pending invite</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Avatar className="w-12 h-12 text-muted-foreground">
            <AvatarFallback className="bg-primary text-white font-normal text-2xl">
              {email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-lg font-medium text-center mt-4 mb-2">
            {`${ownerName} invited you to the workspace`} <br />
            {`"${workspaceName}"`}
          </p>
          <p className="text-muted-foreground text-sm">
            {workspaceDescription}
          </p>
        </div>
        <div className="w-full flex justify-between gap-10 items-center flex-wrap">
          <p className="text-xs">
            {`
              Your invitation expires ${formatDistanceToNow(expires, {
                addSuffix: true,
              })}
              `}
          </p>
          <div className="flex gap-2">
            <Button
              className="bg-transparent border-muted-foreground hover:border-primary hover:text-primary"
              variant="outline"
            >
              Decline
            </Button>
            <Button className="">Accept invitation</Button>
          </div>
        </div>
      </div>
    );
  }

  return <div>{token}</div>;
};

export default AcceptInvitationPage;
