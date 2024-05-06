import { Card, List } from "@prisma/client";

export type ListWithCards = List & {cards : Card[]};

export type CradWithList = Card & {list : List}