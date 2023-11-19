import { CardsService } from "@/core/cards/cards.service";
import { data } from "@/utils/data-access";
import { z } from "zod";

export const fetchCards = data(
  z.object({ deckId: z.string().uuid() }),
  async ({ deckId }) => {
    const cards = await CardsService.getCards({ deckId });
    return cards;
  }
);
