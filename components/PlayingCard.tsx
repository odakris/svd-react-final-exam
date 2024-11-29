import { Colors } from "../types/types";
import { Card, CardContent } from "./ui/card";

type PlayingCardProps = {
  id: number;
  rank: string;
  value: number;
  suit: string;
  symbol: string;
  color: Colors;
  isCardRevealed?: boolean;
};

export default function PlayingCard({
  id,
  rank,
  symbol,
  color,
}: PlayingCardProps) {
  return (
    <Card
      key={id}
      className="border-3 w-[150px] h-[200px] border-4 flex justify-center items m-4"
    >
      <CardContent
        className={`h-0 text-2xl relative left-14 top-1 ${
          color === "red" ? "text-red-500" : "text-indigo-800"
        }`}
      >
        {rank}
      </CardContent>
      <CardContent
        className={`text-7xl flex justify-center items-center ${
          color === "red" ? "text-red-500" : "text-black"
        }`}
      >
        {symbol}
      </CardContent>
      <CardContent
        className={`h-0 text-2xl relative right-14 top-40 ${
          color === "red" ? "text-red-500" : "text-indigo-800"
        }`}
      >
        {rank}
      </CardContent>
    </Card>
  );
}
