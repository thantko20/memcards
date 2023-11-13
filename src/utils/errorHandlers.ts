import { NextResponse } from "next/server";
import { BaseException, isNextRedirectError } from ".";

export type ServerActionError = {
  message: string;
  errors?: string[];
  statusCode?: number;
};

export type ServerActionState<T = ServerActionError> = T | null | undefined;

export const handleErrorsInServerAction = (
  error: unknown
): ServerActionError => {
  if (isNextRedirectError(error)) throw error;

  if (process.env.NODE_ENV !== "production") {
    console.log(error);
  }

  if (error instanceof BaseException) {
    return {
      message: error.message,
      errors: error.errors,
      statusCode: error.statusCode
    };
  }

  return { message: "Unknown Error!" };
};

export const handleErrorsInApi = (error: unknown) => {
  if (isNextRedirectError(error)) throw error;

  if (process.env.NODE_ENV !== "production") {
    console.log(error);
  }

  if (error instanceof BaseException) {
    return NextResponse.json(
      {
        message: error.message,
        errors: error.errors,
        statusCode: error.statusCode
      },
      { status: error.statusCode }
    );
  }
  return NextResponse.json(
    {
      message: "Internal Server Error",
      statusCode: 500
    },
    { status: 500 }
  );
};
