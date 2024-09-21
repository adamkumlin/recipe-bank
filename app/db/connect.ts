import { MongoClient } from "mongodb";
import mongoose from "mongoose";

export function saveUserToDb() {
  mongoose.connect(process.env.DB_CONNECTION_STRING as string);


  try {
    client.connect();
    return client;
  } catch {
    return null;
  }
}
