import { CardType } from "../types/types";

// Fisher-Yates Shuffle
// https://medium.com/@omar.rashid2/fisher-yates-shuffle-a2aa15578d2f
export default function Shuffle(array: CardType[]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    array.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return array;
}
