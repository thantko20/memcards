import { User } from "@/lib/db/schema";

export class Deck {
  private id: string;
  private name: string;
  private description: string;
  private authorId: string;
  private createdAt: Date;
  private updatedAt: Date;
  private author: {
    name: string;
    username: string | null;
    avatar: string | null;
    email: string;
  };

  constructor({
    id,
    name,
    description,
    author,
    createdAt,
    updatedAt,
    authorId
  }: {
    id: string;
    name: string;
    description: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.authorId = authorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.author = {
      name: author.name,
      username: author.username,
      avatar: author.avatar,
      email: author.email
    };
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      author: this.author
    };
  }
}
