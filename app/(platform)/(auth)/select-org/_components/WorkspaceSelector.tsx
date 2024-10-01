"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@/provider/OrganizationContext";
import React from "react";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import WorkSpaceSearchList from "./WorkSpaceSearchList";

const WorkspaceSelector = () => {
  const { organization, isLoading } = useOrganization();
  if (!organization || isLoading) {
    return <Skeleton />;
  }
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle>
          {organization.length > 0
            ? "Select workspace"
            : "Create your first workspace"}
        </CardTitle>
        <CardDescription>
          {organization.length > 0
            ? "Where do you want to work"
            : "Enter workspace name"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {organization.length > 0 ? (
          <React.Fragment>
            <WorkSpaceSearchList workspaces={organization} />
            <Separator className="my-10" />
            <div className="mt-10 space-y-4">
              <div>
                <CardTitle>Create a new workspace</CardTitle>
                <CardDescription>Enter workspace details</CardDescription>
              </div>
              <CreateWorkspaceForm />
            </div>
          </React.Fragment>
        ) : (
          <CreateWorkspaceForm />
        )}
      </CardContent>
    </Card>
  );
};

export default WorkspaceSelector;
