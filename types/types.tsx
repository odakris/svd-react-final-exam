export type Suit = "spades" | "diamonds" | "hearts" | "clubs";

export type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

export type Colors = "red" | "indigo";

export type Card = {
  suit: Suit;
  rank: Rank;
  value: number;
  id: number;
  symbol: string;
  color: Colors;
};

export const SuitMap = {
  hearts: "♥️",
  clubs: "♣️",
  diamonds: "♦️",
  spades: "♠️",
};
