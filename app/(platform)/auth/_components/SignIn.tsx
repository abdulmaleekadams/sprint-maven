/* eslint-disable react/no-unescaped-entities */
"use client";

import FormInput from "@/components/form-input";
import FormSubmit from "@/components/form-submit";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import GoogleButton from "./GoogleButton";

const SignIn = () => {
  const form = useForm({});

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div>
      <Logo />

      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter details to login your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mt-5">
            <GoogleButton buttonText="Sign in with Google" />

            <div className="my-5 flex gap-4 items-center">
              <Separator className="shrink" />
              <p className="text-sm font-semibold whitespace-nowrap text-muted-foreground cursor-default">
                Or sign in with email
              </p>
              <Separator className="shrink" />
            </div>
            <Form {...form}>
              <form action="" className="min-w-80 flex flex-col gap-4">
                <div>
                  <FormLabel className="mb-2 block">Email</FormLabel>
                  <FormInput
                    id="email"
                    name="email"
                    placeholder="sprintmaven@email.com"
                  />
                </div>
                <div>
                  <FormLabel className="mb-2 block">Password</FormLabel>
                  <FormInput
                    id="password"
                    name="password"
                    placeholder="Min. 6 characters"
                    type="password"
                  />
                  <Button
                    variant="link"
                    className="p-0 h-auto mt-2 font-normal items-end flex flex-col"
                    asChild
                  >
                    <Link href="/" className="w-max ml-auto">
                      Forgot Password?
                    </Link>
                  </Button>
                </div>

                <FormSubmit>Sign in</FormSubmit>
              </form>
            </Form>

            <p className="text-left mt-5 text-sm">
              Not registered yet?
              <Link
                href={`/auth/signup${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}`}
                className="ml-1 hover:underline text-primary"
              >
                Create an account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
