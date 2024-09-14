"use server";

import { redirect } from "next/navigation";

export const routeTo = (url: string): void => {
  return redirect(url);
};
