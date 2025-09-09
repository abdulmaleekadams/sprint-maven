// src/infrastructure/api/client.ts
import { getAuthToken } from "@/infrastructure/storage/auth.storage";
import { toast } from "sonner";
import { appConfig } from "../config/app.config";

export const apiClient = async <T>(
  url: string,
  config: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  const headers = new Headers(config.headers || {});

  if (token) {
    headers.set("Authorization", `${token}`);
  }

  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${appConfig.baseUrlDev}${url}`, {
    ...config,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error(data.message || "Something went wrong!");
    throw new Error(data.message || "Network error");
  }

  if (data.responseCode && data.responseCode !== "00") {
    // bubble up error handling
    throw new Error(data.responseMessage || "Application error");
  }

  return data as T;
};
