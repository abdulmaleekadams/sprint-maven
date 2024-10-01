"use client";

import { acceptInvite } from "@/actions/invite-action/accept-invite";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Invitation } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import React, { useState, useTransition } from "react";
import InvitationResponse from "./InvitationResponse";

const InvitationScreen = ({
  invitation,
}: {
  invitation: Invitation & {
    workspace: {
      name: string;
      description: string | null;
      owner: {
        name: string;
      };
    };
  };
}) => {
  const {
    createdAt,
    id,
    email,
    expires,
    workspace: {
      name: workspaceName,
      description: workspaceDescription,
      owner: { name: ownerName },
    },
  } = invitation;

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<
    | {
        success: boolean;
        message: string;
        data?: undefined;
      }
    | {
        success: boolean;
        data: {
          id: string;
          userId: string;
          workspaceId: string;
          roleId: string;
        };
        message: string;
      }
    | null
  >(null);
  const handleAccept = () => {
    startTransition(() => {
      acceptInvite(invitation).then((data) => {
        setResponse(data);
      });
    });
  };

  return (
    <div className="bg-accent p-4  sm:p-6 rounded-md border border-primary/50 flex flex-col justify-between items-center gap-10 max-w-xl w-full min-h-[500px] shadow-md">
      {response ? (
        <InvitationResponse response={response} />
      ) : (
        <React.Fragment>
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
                disabled={isPending}
              >
                Decline
              </Button>
              <Button disabled={isPending} onClick={handleAccept} className="">
                Accept invitation
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default InvitationScreen;
