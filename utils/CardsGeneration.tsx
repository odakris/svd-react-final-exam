import { Card, Colors, Rank, Suit, SuitMap } from "../types/types";

export const suits: Suit[] = ["spades", "diamonds", "hearts", "clubs"];

export const ranks: Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const CardsGeneration = (): Card[] => {
  const cards: Card[] = [];

  suits.forEach((suit, suitIndex) => {
    const color: Colors =
      suit === "hearts" || suit == "diamonds" ? "red" : "indigo";

    ranks.forEach((rank, rankIndex) => {
      let value: number;

      switch (rank) {
        case "J":
          value = 10;
          break;
        case "Q":
          value = 11;
          break;
        case "K":
          value = 12;
          break;
        case "A":
          value = 13;
          break;
        default:
          value = parseInt(rank);
          break;
      }

      cards.push({
        value: value,
        rank: rank,
        suit: suit,
        id: suitIndex + rankIndex,
        symbol: SuitMap[suit],
        color: color,
      });
    });
  });

  return cards;
};

export default CardsGeneration;
