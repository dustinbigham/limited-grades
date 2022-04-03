import constate from "constate";
import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo, useState } from "react";

import { ALL_CARD_TYPES, ALL_RARITIES } from "lib/constants";
import { CardTableDictionary } from "lib/table";
import { Card, Deck, MagicSet } from "lib/types";

interface Props {
  set: MagicSet;
  cards: Card[];
}

const useCardTableContextValue = ({ set, cards }: Props) => {
  const router = useRouter();
  const [selectedSet, setSelectedSet] = useState(set);
  const [isLoading, setIsLoading] = useState(false);
  const [deck, setDeck] = useState(Deck.ALL);
  const [visibleRarities, setVisibleRarities] = useState(new Set(ALL_RARITIES));
  const [visibleCardTypes, setVisibleCardTypes] = useState(
    new Set(ALL_CARD_TYPES)
  );
  const [showSkeletons, setShowSkeletons] = useState(false);

  useEffect(() => {
    if (selectedSet === set) {
      if (isLoading) {
        setIsLoading(false);
        setShowSkeletons(false);
      }
    } else if (isLoading) {
      router
        .push(`/${selectedSet}`)
        .catch((error) => console.log(`Failed to push new route: ${error}`));
    } else {
      setSelectedSet(set);
    }
  }, [selectedSet, set, isLoading, router]);

  useEffect(() => {
    if (isLoading) {
      // Add small delay before showing placeholders to prevent screen stuttering
      const timer = setTimeout(() => setShowSkeletons(true), 300);
      return () => clearTimeout(timer);
    }
    setShowSkeletons(false);
    return undefined;
  }, [isLoading]);

  const cardDictionary = useMemo(() => {
    const filteredCards = cards
      .filter((card) => visibleRarities.has(card.rarity))
      .filter((card) =>
        card.cardTypes.some((cardType) => visibleCardTypes.has(cardType))
      );
    return new CardTableDictionary(filteredCards, deck);
  }, [cards, deck, visibleRarities, visibleCardTypes]);

  const changeSet = (newSet: MagicSet) => {
    setSelectedSet(newSet);
    setIsLoading(true);
  };

  return {
    set,
    cards,
    selectedSet,
    changeSet,
    deck,
    setDeck,
    visibleRarities,
    setVisibleRarities,
    visibleCardTypes,
    setVisibleCardTypes,
    cardDictionary,
    showSkeletons,
  };
};

const [CardTableContextProvider, useCardTableContext] = constate(
  useCardTableContextValue
);
export { CardTableContextProvider };
export default useCardTableContext;
