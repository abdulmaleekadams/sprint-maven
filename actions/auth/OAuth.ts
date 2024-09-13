"use server";

import { signIn } from "@/auth";

export const GoogleAuth = async () => {
  const res = await signIn("google", {
    redirectTo: "/",
  });
  console.log(res);

  console.log(res);
};
