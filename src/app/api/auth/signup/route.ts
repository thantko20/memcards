import { RegisterSchema } from "@/core/auth/auth.validation";
import { auth } from "@/lib/lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const result = RegisterSchema.safeParse(body);
  return new NextResponse();
};
