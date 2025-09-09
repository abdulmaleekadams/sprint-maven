// src/infrastructure/api/card.api.ts
import { Card } from "@/domain/card/card.types";
import { apiClient } from "./client";

export const CardApi = {
  async createCard(payload: Omit<Card, "id" | "createdAt" | "updatedAt">) {
    return apiClient<Card>("/cards", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async getCards(boardId: string) {
    return apiClient<Card[]>(`/boards/${boardId}/cards`, {
      method: "GET",
    });
  },
};
