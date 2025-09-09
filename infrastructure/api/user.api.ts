// src/infrastructure/api/card.api.ts
import { User } from "@/domain/user/user.types";
import { apiClient } from "./client";

export const UserApi = {
  async initiateEnrollment(
    payload: Omit<User, "userId" | "userCreatedAt" | "userUpdatedAt">
  ) {
    return apiClient<User>("public/auth/initiate-enrollment", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
