import { MongoClient } from "mongodb";

export function connectToDb(): MongoClient | null {
  const client = new MongoClient(process.env.DB_CONNECTION_STRING as string);

  try {
    client.connect();
    client.db("admin").command({ping: 1});
    return client;
  } catch {
    return null;
  }
}
