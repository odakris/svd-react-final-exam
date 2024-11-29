import PlayingCard from "../../components/PlayingCard";
import CardsGeneration from "../../utils/CardsGeneration";

export default function Page() {
  const allCards = CardsGeneration();
  return (
    <div className="flex justify-center flex-wrap">
      {allCards.map((card, index) => {
        return (
          <PlayingCard
            key={index}
            rank={card.rank}
            value={card.value}
            suit={card.suit}
            id={card.id}
            symbol={card.symbol}
            color={card.color}
          />
        );
      })}
    </div>
  );
}
