export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string | null;
  private createdAt: Date;
  private updatedAt: Date;
  private username: string;
  private avatar: string | null;

  constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt,
    username,
    avatar
  }: {
    id: string;
    name: string;
    email: string;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    avatar: string | null;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
    this.avatar = avatar;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string | null {
    return this.password;
  }

  public getUsername(): string {
    return this.username;
  }

  public getAvatar(): string | null {
    return this.avatar;
  }

  public toObject(safe: boolean = true) {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      avatar: this.avatar,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...(!safe && { password: this.password })
    };
  }
}
