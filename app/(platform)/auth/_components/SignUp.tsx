/* eslint-disable react/no-unescaped-entities */
"use client";

import FormInput from "@/components/form-input";
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
import Link from "next/link";
import { useForm } from "react-hook-form";
import GoogleButton from "./GoogleButton";

const SignUp = () => {
  const form = useForm({});
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
              <form action="" className="min-w-80 flex flex-col gap-4">
                <div>
                  <FormLabel className="mb-2 block">Your name</FormLabel>
                  <div className="flex gap-2">
                    <div>
                      <FormInput
                        id="email"
                        name="email"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <FormInput
                        id="email"
                        name="email"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <FormLabel className="mb-2 block">Email</FormLabel>
                  <FormInput
                    id="email"
                    name="email"
                    placeholder="sprintmaven@email.com"
                  />
                </div>
                <div>
                  <FormLabel className="mb-2 block">Username</FormLabel>
                  <FormInput
                    id="username"
                    name="username"
                    placeholder="sprintmaven"
                  />
                </div>
                <div>
                  <FormLabel className="mb-2 block">Password</FormLabel>
                  <FormInput
                    id="password"
                    name="password"
                    placeholder="Min. 6 characters"
                  />
                </div>

                <FormSubmit>Sign up</FormSubmit>
              </form>
            </Form>

            <p className="text-left mt-5 text-sm">
              Already have an account?
              <Link
                href="/auth/sign-in"
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
