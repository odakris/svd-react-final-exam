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

export type CardType = {
  id: number;
  rank: Rank;
  value: number;
  suit: Suit;
  symbol: string;
  color: Colors;
};

export const SuitMap = {
  hearts: "♥️",
  clubs: "♣️",
  diamonds: "♦️",
  spades: "♠️",
};
