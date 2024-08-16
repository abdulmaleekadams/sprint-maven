import { Card, Label, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { List: List };

export type CardWithListLabel = Card & { List: List; labels: Label[] };
