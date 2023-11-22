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
  CardFooter,
  CardDescription
} from "../ui/card";
import { DeckWithAuthor } from "./types";

export const DeckCard = ({ deck }: { deck: DeckWithAuthor }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="h-[2ch]">{deck.name}</CardTitle>
        <CardDescription>Created by {deck.author.name}</CardDescription>
      </CardHeader>
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
