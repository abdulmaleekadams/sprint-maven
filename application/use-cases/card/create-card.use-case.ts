// src/application/use-cases/card/createCard.use-case.ts
import { Card } from "@/domain/card/card.types";
import { CardApi } from "@/infrastructure/api/card.api";

export const createCardUseCase = async (
  input: Omit<Card, "id" | "createdAt" | "updatedAt">
): Promise<Card> => {
  try {
    const newCard = await CardApi.createCard(input);
    return newCard;
  } catch (error) {
    // Bubble error to presentation layer (UI will decide how to show it)
    throw error;
  }
};
