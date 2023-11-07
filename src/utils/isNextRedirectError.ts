export const isNextRedirectError = (error: unknown) => {
  return error instanceof Error && error.message === "NEXT_REDIRECT";
};
