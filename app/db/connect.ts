import { lucia } from "@/auth";
import { Session, User } from "lucia";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { cache } from "react";

export function connectToDb(): MongoClient | null {
  const client = new MongoClient(process.env.DB_CONNECTION_STRING as string);

  try {
    client.connect();
    return client;
  } catch {
    return null;
  }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId || sessionId.length !== 24) {
      return {
        user: null,
        session: null,
      };
    }

	//@ts-expect-error
	const result = await lucia.validateSession(new (sessionId));
    // next.js throws when you attempt to set cookie when rendering page
	console.log(result)
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);
