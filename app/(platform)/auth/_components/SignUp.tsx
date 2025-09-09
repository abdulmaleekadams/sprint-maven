/* eslint-disable react/no-unescaped-entities */
"use client";

import { initiateCreateUserUseCase } from "@/application/use-cases/user/initiate-create-user.use-case";
import {
  InitiateEnrollmentDto,
  InitiateEnrollmentSchema,
} from "@/application/validation/user/initiate-enrollment.validation";
import { InputField } from "@/components/form-fields";
import FormSubmit from "@/components/form-submit";
import Logo from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import GoogleButton from "./GoogleButton";

const SignUp = () => {
  const form = useForm<InitiateEnrollmentDto>({
    resolver: zodResolver(InitiateEnrollmentSchema),
    defaultValues: {},
  });

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const handleSignUp = async (data: InitiateEnrollmentDto) => {
    try {
      const newUser = await initiateCreateUserUseCase(data);
      console.log(newUser);
    } catch (error) {}
  };
  return (
    <div>
      <Logo />
      <Card className="">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mt-5">
            <GoogleButton buttonText="Continue with Google" />
            <div className="my-5 flex gap-4 items-center">
              <Separator className="shrink" />
              <p className="text-sm font-semibold whitespace-nowrap text-muted-foreground cursor-default">
                Or sign up with email
              </p>
              <Separator className="shrink" />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignUp)}
                className="min-w-80 flex flex-col gap-4"
              >
                <div>
                  <FormLabel className="mb-2 block">Your name</FormLabel>
                  <div className="flex gap-2">
                    <InputField
                      form={form}
                      name="userFirstName"
                      placeholder="First name"
                    />
                    <InputField
                      form={form}
                      name="userLastName"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <InputField
                    form={form}
                    name="userEmail"
                    label="Email"
                    placeholder="username@domain.com"
                  />
                </div>
                <div>
                  <InputField
                    form={form}
                    name="username"
                    label="Username"
                    placeholder="username"
                  />
                </div>
                <div>
                  <InputField
                    form={form}
                    name="userPassword"
                    label="Password"
                    type="password"
                    placeholder="*************"
                  />
                </div>

                <FormSubmit disabled={form.formState.isSubmitting}>
                  Sign up
                </FormSubmit>
              </form>
            </Form>

            <p className="text-left mt-5 text-sm">
              Already have an account?
              <Link
                href={`/auth/signin${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
                className="ml-1 hover:underline text-primary"
              >
                Login now
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
