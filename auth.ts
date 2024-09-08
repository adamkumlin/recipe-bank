import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";
import { Db, MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_CONNECTION_STRING as string);

let db = client?.db() as Db;
const user = db.collection<UserDoc>("Users");
const session = db.collection<SessionDoc>("Sessions");
const adapter = new MongodbAdapter(session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  username: string;
}

interface UserDoc extends DatabaseUserAttributes {
  _id: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}
