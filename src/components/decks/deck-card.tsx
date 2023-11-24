"use client";

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
import { Avatar, AvatarImage } from "../ui/avatar";

export const DeckCard = ({ deck }: { deck: DeckWithAuthor }) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="h-[2ch]">{deck.name}</CardTitle>
        {deck.isCurrentUserCard ? null : (
          <CardDescription className="flex items-center gap-2 text-xs">
            Created by
            <div className="flex items-center gap-1 text-sm">
              <Avatar className="w-6 h-6 rounded-full">
                <AvatarImage
                  src={
                    deck.author.avatar ??
                    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mountsinai.on.ca%2Fwellbeing%2Four-team%2Fteam-images%2Fperson-placeholder%2Fimage_view_fullscreen&psig=AOvVaw3JoHATkBxzQsy_WlIZ53EY&ust=1700903737273000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCOjDjKqm3IIDFQAAAAAdAAAAABAJ"
                  }
                />
              </Avatar>
              {deck.author.name}
            </div>
          </CardDescription>
        )}
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
