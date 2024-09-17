import { createWorkspace } from "@/actions/create-workspace";
import FormInput from "@/components/form-input";
import FormSubmit from "@/components/form-submit";
import FormTextarea from "@/components/form-textarea";
import { Label } from "@/components/ui/label";
import { useAction } from "@/hoooks/use-action";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateWorkspaceForm = () => {
  const { update } = useSession();
  const queryClient = useQueryClient();

  const router = useRouter();

  const { isLoading, execute, fieldErrors, error } = useAction(
    createWorkspace,
    {
      onSuccess: (data) => {
        if (data.id) {
          update({ workspaceId: data.id });
          queryClient.invalidateQueries({
            queryKey: ["organization"],
          });
        }
        router.replace(`/organization/${data.id}`);
      },
    }
  );

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    execute({ name, description });
  };
  return (
    <form action={onSubmit} className="flex flex-col gap-3">
      <Label>Name</Label>
      <FormInput id="name" name="name" errors={fieldErrors} />
      <Label>Description</Label>
      <FormTextarea id="description" name="description" errors={fieldErrors} />
      <FormSubmit>Create</FormSubmit>
    </form>
  );
};

export default CreateWorkspaceForm;
