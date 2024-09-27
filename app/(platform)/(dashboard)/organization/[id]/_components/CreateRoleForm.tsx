import { createRole } from "@/actions/create-role";
import { CreateRoleFormSchema } from "@/actions/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hoooks/use-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateRoleForm = () => {
  const params = useParams();

  const {
    execute: executeCreateRole,
    error: createRoleError,
    fieldErrors: createRoleFieldError,
    isLoading: createRoleIsLoading,
  } = useAction(createRole, {
    onSuccess: (data) => {
      toast.success(`"${data.title}" role created successfully`);
    },
  });

  const form = useForm<z.infer<typeof CreateRoleFormSchema>>({
    resolver: zodResolver(CreateRoleFormSchema),
    defaultValues: {
      role: "",
      workspaceId: params.id as string,
    },
  });
  const handleCreateRole = (values: z.infer<typeof CreateRoleFormSchema>) => {
    const { role, workspaceId } = values;

    console.log({ role, workspaceId });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateRole)}
        className="flex flex-col gap-3"
      >
        <p>Create new role</p>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Role title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={createRoleIsLoading}>Create role</Button>
      </form>
    </Form>
  );
};

export default CreateRoleForm;
