import { UserDoc } from "@/auth";
import { Collection } from "mongodb";

export async function getUserFromName(userName: string, collection: Collection<UserDoc>) {
    try {
        const user = await collection.findOne<UserDoc>({username: userName.toLowerCase()});
        return user;
    } catch (error) {
        return null;
    }
}