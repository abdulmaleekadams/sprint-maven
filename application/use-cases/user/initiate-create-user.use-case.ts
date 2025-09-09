// src/application/use-cases/card/createCard.use-case.ts
import { User } from "@/domain/user/user.types";
import { UserApi } from "@/infrastructure/api/user.api";

export const initiateCreateUserUseCase = async (
  input: Omit<User, "userId" | "userCreatedAt" | "userUpdatedAt">
): Promise<User> => {
  try {
    const newUser = await UserApi.initiateEnrollment(input);
    return newUser;
  } catch (error) {
    // Bubble error to presentation layer (UI will decide how to show it)
    throw error;
  }
};
