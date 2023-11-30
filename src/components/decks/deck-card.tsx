"use client";

import { Eye, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "../ui/card";
import { DeckWithAuthor } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useOptimisticAction } from "next-safe-action/hook";
import { likeDeck } from "@/actions/decks.actions";
import { cn } from "@/utils/ui";

export const DeckCard = ({ deck: originalDeck }: { deck: DeckWithAuthor }) => {
  const router = useRouter();
  const { execute, result, optimisticData } = useOptimisticAction(
    likeDeck,
    originalDeck,
    (state) => ({
      ...state,
      hasLiked: !state.hasLiked,
      likesCount: state.hasLiked ? state.likesCount - 1 : state.likesCount + 1,
    }),
  );
  const deck = result.data || optimisticData;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="h-[2ch]">{deck.name}</CardTitle>
        <CardDescription>
          <span className="block break-words text-gray-700 dark:text-gray-300 h-[3ch]">
            {deck.description}
          </span>
          <div className="flex items-center gap-2 text-xs mt-8">
            Created by
            <span className="flex items-center gap-1 text-sm">
              <Avatar className="w-6 h-6 rounded-full">
                <AvatarImage src={deck.author.avatar ?? undefined} />
                <AvatarFallback>
                  {deck.author.name
                    .split(" ")
                    .map((value) => value[0])
                    .join("")
                    .substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              {deck.author.name}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center gap-6">
        <button
          onClick={() => execute({ deckId: deck.id })}
          aria-label={deck.hasLiked ? "unlike this deck" : "like this deck"}
          className="flex items-center group"
        >
          <span className="transition-colors group-hover:bg-black/5 dark:group-hover:bg-white/10 w-8 h-8 flex items-center justify-center rounded-full">
            <Heart
              size={16}
              className={cn(
                deck.hasLiked
                  ? "fill-red-600 stroke-red-600 dark:fill-red-500 dark:stroke-red-500"
                  : "",
              )}
            />
          </span>
          <span
            className={cn(
              "text-xs tabular-nums",
              deck.hasLiked && "text-red-600 dark:text-red-500",
            )}
          >
            {deck.likesCount}
          </span>
        </button>
        <Button
          variant="default"
          leftSection={<Eye size={16} />}
          onClick={() => router.push(`/app/decks/${deck.id}`)}
          className="w-full"
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
};
