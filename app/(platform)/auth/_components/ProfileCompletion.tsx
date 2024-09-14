"use client";
import { updateUser } from "@/actions/update-user";
import FormInput from "@/components/form-input";
import FormSubmit from "@/components/form-submit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAction } from "@/hoooks/use-action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

const ProfileCompletion = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { update: updateSession, status } = useSession();

  const { fieldErrors, execute, isLoading, data } = useAction(updateUser, {
    onSuccess(data) {
      console.log(status);

      updateSession({ username: data.username });
      toast.success(`${data.username} saved successfully`);
      router.refresh();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;

    execute({ username });
  };

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Complete your profile</CardTitle>
          <CardDescription>
            Enter details to complete your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mt-5">
            <form
              ref={formRef}
              action={onSubmit}
              className="min-w-80 flex flex-col gap-4"
            >
              <div>
                <Label className="mb-2 block">Username</Label>
                <FormInput
                  id="username"
                  name="username"
                  placeholder="sprintmaven"
                  disabled={isLoading}
                />
              </div>

              <FormSubmit disabled={isLoading}>Save</FormSubmit>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCompletion;
