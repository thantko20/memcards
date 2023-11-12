import { users } from "@/lib/db/schema";
import { auth, googleAuth } from "@/lib/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import { InferSelectModel } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get("google_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, { status: 400 });
  }

  try {
    const { getExistingUser, googleUser, createUser } =
      await googleAuth.validateCallback(code);
    console.log(googleUser);
    let user: InferSelectModel<typeof users>;
    const existingUser = await getExistingUser();
    if (existingUser) {
      user = existingUser;
    } else {
      user = await createUser({
        userId: crypto.randomUUID(),
        attributes: {
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.picture
        }
      });
    }

    const session = await auth.createSession({
      userId: user.id,
      attributes: {}
    });
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers
    });
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/app"
      }
    });
  } catch (error) {
    if (error instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }
};
