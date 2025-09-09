export type CardId = string;

export interface Card {
  id: CardId;
  title: string;
  description?: string;
  order: number;
  listId: string;
  boardId: string;
  labels: string[];
  point?: number | null;
  priority?: number | null;
  severity?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
