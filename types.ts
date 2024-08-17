import {
  Card,
  CheckItems,
  Checklist as CheckListType,
  Label,
  List,
} from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { List: List };

export type CardWithListLabel = Card & { List: List; labels: Label[] };

export type Checklist = CheckListType & { checkItems: CheckItems[] };

export type CardFullDetails = Card & {
  List: List;
  labels: Label[];
  checklist: Checklist[];
};
