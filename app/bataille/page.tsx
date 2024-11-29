"use client";

import PlayingCard from "@/components/PlayingCard";
import CardsGeneration from "@/utils/CardsGeneration";
import Shuffle from "@/utils/Shuffle";
import { useEffect, useState } from "react";
import { Card } from "@/types/types";
import { Button } from "../../components/ui/button";

export default function Page() {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [computerCards, setComputerCards] = useState<Card[]>([]);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);

  const startGame = () => {
    const shuffleCards = Shuffle(CardsGeneration());
    setAllCards(shuffleCards);

    const computerHalf = shuffleCards.slice(
      0,
      Math.ceil(shuffleCards.length / 2)
    );
    setComputerCards(computerHalf);

    const playerHalf = shuffleCards.slice(Math.ceil(shuffleCards.length / 2));
    setPlayerCards(playerHalf);
  };

  useEffect(() => {
    startGame();
  }, []);

  //   console.log(playerCards[0].id);

  return (
    <>
      <div className="flex justify-center flex-wrap">
        <PlayingCard
          key={computerCards[0].id}
          rank={computerCards[0].rank}
          value={computerCards[0].value}
          suit={computerCards[0].suit}
          id={computerCards[0].id}
          symbol={computerCards[0].symbol}
          color={computerCards[0].color}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button className="w-[100px] text-xl m-4">Next Card</Button>
      </div>

      <div className="flex justify-center flex-wrap">
        <PlayingCard
          key={playerCards[0].id}
          rank={playerCards[0].rank}
          value={playerCards[0].value}
          suit={playerCards[0].suit}
          id={playerCards[0].id}
          symbol={playerCards[0].symbol}
          color={playerCards[0].color}
        />
      </div>
    </>
  );
}
