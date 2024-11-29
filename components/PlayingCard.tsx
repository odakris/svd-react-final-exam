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
      className="border-3 w-[200px] h-[300px] border-4 flex justify-center m-4"
    >
      <CardContent
        className={`h-0 text-4xl relative left-16 top-3 ${
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
        className={`h-0 text-4xl relative right-16 top-60 ${
          color === "red" ? "text-red-500" : "text-indigo-800"
        }`}
      >
        {rank}
      </CardContent>
    </Card>
  );
}
