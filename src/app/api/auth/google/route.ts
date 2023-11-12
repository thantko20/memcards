import { googleAuth } from "@/lib/lucia";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export const GET = async (request: NextRequest) => {
  const [url, state] = await googleAuth.getAuthorizationUrl();

  cookies().set("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60
  });
  cookies().set("app", "web");

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString()
    }
  });
};
