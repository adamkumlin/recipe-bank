import { Collection, Db, MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_CONNECTION_STRING as string);

const db = client?.db("RecipeBank") as Db;
