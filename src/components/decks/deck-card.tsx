"use client";

import { Deck } from "@/lib/db/schema";
import { User } from "lucia";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "../ui/card";

export type DeckWithAuthor = Deck & { author: User };

export const DeckCard = ({ deck }: { deck: DeckWithAuthor }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="h-[2ch]">{deck.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="break-all h-12">{deck.description}</p>
        <p className="text-xs mt-2 italic">Created by {deck.author.name}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          variant="default"
          className="w-full"
          leftSection={<Eye size={16} />}
          onClick={() => router.push(`/app/decks/${deck.id}`)}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
};
