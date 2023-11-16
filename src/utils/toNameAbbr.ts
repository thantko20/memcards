export const toNameAbbr = (name: string, numberOfLetters: number) => {
  if (numberOfLetters < 0) {
    throw new Error("numberOfLetters must be greater than 0");
  }

  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")
    .substring(0, numberOfLetters);
};
