import {
  Card,
  CheckItems,
  Checklist as CheckListType,
  Comment,
  Label,
  List,
} from "@prisma/client";

export type ListWithCards = List & { cards: CardList[] };

export type CardWithList = Card & { List: List };

export type CardWithListLabel = Card & { List: List; labels: Label[] };

export type Checklist = CheckListType & { checkItems: CheckItems[] };

export type CardFullDetails = Card & {
  List: List;
  labels: Label[];
  checklist: Checklist[];
  taskAssignments: {
    id: string;
    userId: string;
    taskId: string;
    user: {
      name: string;
      image: string;
      email: string;
      username: string;
    };
  }[];
};

export type CommentWithUser = Comment & {
  user: {
    id: string;
    username: string | null;
    name: string;
    image: string | null;
  };
};

export type CardList = Card & {
  labels: Label[];
  checklist: { checkItems: CheckItems[] }[];
  user: { name: string };
  _count: { comments: number; attachments: number };
  taskAssignments: {
    id: string;
    user: {
      name: string;
      image: string;
    };
  }[];
};
