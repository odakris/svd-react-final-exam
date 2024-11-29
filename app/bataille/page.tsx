"use client";

import PlayingCard from "@/components/PlayingCard";
import CardsGeneration from "@/utils/CardsGeneration";
import Shuffle from "@/utils/Shuffle";
import { useEffect, useState } from "react";
import { CardType } from "@/types/types";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export default function Page() {
  //   const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const [computerCards, setComputerCards] = useState<CardType[]>([]);
  const [playerCards, setPlayerCards] = useState<CardType[]>([]);
  const [message, setMessage] = useState<string>("");

  //   setIsGameStarted(true);
  // GAME SET UP
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

  // HANDLE ROUND
  const handleRound = () => {
    if (playerCards.length === 0 || computerCards.length === 0) {
      setMessage("GAME OVER");
      return;
    }
    const currentPlayerCard = playerCards[0];
    const currentComputerCard = computerCards[0];

    if (currentPlayerCard.value > currentComputerCard.value) {
      console.log("Player wins the round!");
      setMessage("Player wins the round!");

      const newPlayerCards = [...playerCards, currentComputerCard];
      setPlayerCards(newPlayerCards);

      const newComputerCards = computerCards.slice(1);
      setComputerCards(newComputerCards);
    } else if (currentPlayerCard.value < currentComputerCard.value) {
      console.log("Computer wins the round!");
      setMessage("Computer wins the round!");

      const newPlayerCards = computerCards.slice(1);
      setPlayerCards(newPlayerCards);

      const newComputerCards = [...playerCards, currentComputerCard];
      setComputerCards(newComputerCards);
    } else {
      console.log("BATAILLE");
      setMessage("BATAILLE !!!");
    }
  };

  return (
    <div className=" h-full w-full flex flex-col justify-evenly">
      <div>
        <Card className="w-full h-[50px] bg-white">
          <CardContent className="flex justify-center p-3">{`Remaining Computer Cards: ${computerCards.length}`}</CardContent>
        </Card>
        <div className="flex justify-center flex-wrap">
          {computerCards.length > 0 && (
            <PlayingCard
              key={computerCards[0].id}
              rank={computerCards[0].rank}
              value={computerCards[0].value}
              suit={computerCards[0].suit}
              id={computerCards[0].id}
              symbol={computerCards[0].symbol}
              color={computerCards[0].color}
            />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <Button className="w-[100px] text-xl m-4" onClick={handleRound}>
          Next Card
        </Button>
        <Card className="w-full h-[50px] bg-white">
          <CardContent className="flex justify-center p-3">
            {message}
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="flex justify-center flex-wrap">
          {computerCards.length > 0 && (
            <PlayingCard
              key={playerCards[0].id}
              rank={playerCards[0].rank}
              value={playerCards[0].value}
              suit={playerCards[0].suit}
              id={playerCards[0].id}
              symbol={playerCards[0].symbol}
              color={playerCards[0].color}
            />
          )}
        </div>
        <Card className="w-full h-[50px] bg-white">
          <CardContent className="flex justify-center p-3">{`Remaining Player Cards: ${playerCards.length}`}</CardContent>
        </Card>
      </div>
    </div>
  );
}
