"use client";

import PlayingCard from "@/components/PlayingCard";
import CardsGeneration from "@/utils/CardsGeneration";
import Shuffle from "@/utils/Shuffle";
import { useEffect, useState } from "react";
import { CardType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  const [computerCards, setComputerCards] = useState<CardType[]>([]);
  const [playerCards, setPlayerCards] = useState<CardType[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isBataille, setIsBataille] = useState<boolean>(false);
  const [bataillePlayerCards, setBataillePlayerCards] = useState<CardType[]>([]);
  const [batailleComputerCards, setBatailleComputerCards] = useState<CardType[]>([]);
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

  // GAME SETUP
  const startGame = () => {
    const shuffleCards = Shuffle(CardsGeneration());

    // SPLITE CARDS INTO TWO SET OF CARDS FOR EACH PLAYER
    const computerHalf = shuffleCards.slice(0, Math.ceil(shuffleCards.length / 2));
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
      // NO CARD LEFT ==> GAME OVER
      setMessage("GAME OVER");
      return;
    }

    // GET FIRST CARD FROM EACH SET OF CARDS
    const currentPlayerCard = playerCards[0];
    const currentComputerCard = computerCards[0];

    // CARD COMPARISON AND WINNER & LOSER
    if (currentPlayerCard.value > currentComputerCard.value) {
      // WINNER ROUND PLAYER
      setMessage("Player won the previous round!");

      // SET NEW PLAYER CARDS
      const newPlayerCards = [...playerCards.slice(1), currentPlayerCard, currentComputerCard];
      setPlayerCards(newPlayerCards);

      // SET NEW CCOMPUTER CARDS
      const newComputerCards = computerCards.slice(1);
      setComputerCards(newComputerCards);
    } else if (currentPlayerCard.value < currentComputerCard.value) {
      // WINNER ROUND COMPUTER
      setMessage("Computer won the previous round!");

      // SET NEW PLAYER CARDS
      const newPlayerCards = playerCards.slice(1);
      setPlayerCards(newPlayerCards);

      // SET NEW CCOMPUTER CARDS
      const newComputerCards = [...computerCards.slice(1), currentComputerCard, currentPlayerCard];
      setComputerCards(newComputerCards);
    } else {
      // BATLLE
      setMessage("BATAILLE !!!");
      setIsBataille(true);
      setIsDisabledButton(true);
      handleBataille(currentPlayerCard, currentComputerCard);
    }
  };

  // BATTLE HANDLER
  const handleBataille = (currentPlayerCard: CardType, currentComputerCard: CardType) => {
    // ENSURE PLAYER AND COPUTER GET ENOUGH CARDS
    if (playerCards.length < 3 || computerCards.length < 3) {
      setMessage("Not enough cards.");
      setIsBataille(false);
      return;
    }

    // ADD CARDS THAT WILL PERFORM THE BATTLE (CURRENT CARD, CARD FACEDOWN & THIRD CARD)
    const currentBataillePlayerCards = [
      currentPlayerCard, // CURRENT CARD THAT PROVOKE BATTLE
      ...playerCards.slice(1, 3), // CARD FACEDOWN & CARD THAT WILL (PERHAPS) SET THE BATTLE
    ];
    setBataillePlayerCards(currentBataillePlayerCards);

    // SAME FOR COMPUTER BATTLE CARDS
    const currentBatailleComputerCards = [currentComputerCard, ...computerCards.slice(1, 3)];
    setBatailleComputerCards(currentBatailleComputerCards);

    // REMOVE ALL BATTLE CARDS FROM SET OF CARD FOR PLAYER AND COMPUTER
    const newPlayerCards = playerCards.slice(3);
    const newComputerCards = computerCards.slice(3);

    // COMPARISON TO DETERMINE BATTLE WINNER
    if (currentBataillePlayerCards[2].value > currentBatailleComputerCards[2].value) {
      // MESSAGE
      setMessage("Player won the previous War!");

      // PLAYER WINS
      setPlayerCards([...newPlayerCards, ...bataillePlayerCards, ...batailleComputerCards]);
      // COMPUTER LOST
      setComputerCards(newComputerCards);

      // END BATTLE
      setTimeout(() => {
        setIsBataille(false);
      }, 2000);
    } else if (currentBataillePlayerCards[2].value < currentBatailleComputerCards[2].value) {
      // MESSAGE
      setMessage("Computer won the previous War!");

      // COMPUTER WINS
      setComputerCards([...newComputerCards, ...batailleComputerCards, ...bataillePlayerCards]);

      // PLAYER LOST
      setPlayerCards(newPlayerCards);

      // END BATTLE
      setTimeout(() => {
        setIsBataille(false);
      }, 2000);
    } else {
      // BATTLE AGAIN
      setMessage("ANOTHER BATAILLE !!!");
      setIsBataille(true);
      handleBataille(bataillePlayerCards[2], batailleComputerCards[2]);
    }

    setTimeout(() => {
      setIsBataille(false);
      setIsDisabledButton(false);
    }, 2000);
  };

  return (
    <div className="h-full w-full flex flex-col justify-evenly">
      <div>
        <Card className="w-full h-[50px] bg-white">
          <CardContent className="flex justify-center p-3">{`Remaining Computer Cards: ${computerCards.length}`}</CardContent>
        </Card>
        <div className="flex justify-center flex-wrap">
          {computerCards.length > 0 && !isBataille ? (
            <PlayingCard
              key={`computer-${computerCards[0].id}`}
              rank={computerCards[0].rank}
              value={computerCards[0].value}
              suit={computerCards[0].suit}
              id={computerCards[0].id}
              symbol={computerCards[0].symbol}
              color={computerCards[0].color}
              isCardFaceDown={false}
            />
          ) : (
            batailleComputerCards.length > 0 &&
            batailleComputerCards.map((card, index) => (
              <PlayingCard
                key={`computer-${card.id}-${index}`}
                rank={card.rank}
                value={card.value}
                suit={card.suit}
                id={card.id}
                symbol={card.symbol}
                color={card.color}
                isCardFaceDown={index % 2 !== 0}
              />
            ))
          )}
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <Button
          className="w-[200px] text-xl m-4 font-semibold"
          onClick={handleRound}
          disabled={isDisabledButton}
        >
          Next Card
        </Button>
        <Card className="w-full h-[50px] bg-white">
          <CardContent className="flex justify-center p-3">{message}</CardContent>
        </Card>
      </div>

      <div>
        <div className="flex justify-center flex-wrap">
          {playerCards.length > 0 && !isBataille ? (
            <div className="flex">
              <PlayingCard
                key={`player-${playerCards[0].id}`}
                rank={playerCards[0].rank}
                value={playerCards[0].value}
                suit={playerCards[0].suit}
                id={playerCards[0].id}
                symbol={playerCards[0].symbol}
                color={playerCards[0].color}
                isCardFaceDown={false}
              />
              {/* Display the "Next Card" */}
              {playerCards.length > 1 && (
                <div className="absolute right-10 scale-75">
                  <Card className="w-full h-[50px] bg-white">
                    <CardContent className="flex justify-center p-3">Next Card</CardContent>
                  </Card>
                  <PlayingCard
                    key={`player-${playerCards[1].id}`}
                    rank={playerCards[1].rank}
                    value={playerCards[1].value}
                    suit={playerCards[1].suit}
                    id={playerCards[1].id}
                    symbol={playerCards[1].symbol}
                    color={playerCards[1].color}
                    isCardFaceDown={false}
                  />
                </div>
              )}
            </div>
          ) : (
            bataillePlayerCards.length > 0 && (
              <div className="flex">
                {bataillePlayerCards.map((card, index) => (
                  <PlayingCard
                    key={`player-${card.id}-${index}`}
                    rank={card.rank}
                    value={card.value}
                    suit={card.suit}
                    id={card.id}
                    symbol={card.symbol}
                    color={card.color}
                    isCardFaceDown={index % 2 !== 0}
                  />
                ))}
                {/* Display the "Next Card" after mapping through bataillePlayerCards */}
                {playerCards.length > 1 && (
                  <div className="absolute right-10 scale-75">
                    <Card className="w-[100px] h-[50px] bg-white">
                      <CardContent className="flex justify-center p-3">Next Card</CardContent>
                    </Card>
                    <PlayingCard
                      key={`player-next-${playerCards[1].id}`}
                      rank={playerCards[1].rank}
                      value={playerCards[1].value}
                      suit={playerCards[1].suit}
                      id={playerCards[1].id}
                      symbol={playerCards[1].symbol}
                      color={playerCards[1].color}
                      isCardFaceDown={false}
                    />
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <Card className="w-full h-[50px] bg-white">
          <CardContent className="flex justify-center p-3">{`Remaining Player Cards: ${playerCards.length}`}</CardContent>
        </Card>
      </div>
    </div>
  );
}
