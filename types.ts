import {
  Card,
  CheckItems,
  Checklist as CheckListType,
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
};

export type CardList = Card & {
  labels: Label[];
  checklist: { checkItems: CheckItems[] }[];
};
