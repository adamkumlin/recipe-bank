import { Collection } from "mongodb";
import { User } from "../utils/types";

export async function addNewUser(user: User, collection: Collection<User>): Promise<void> {
    try {
        await collection.insertOne({
            name: user.name.toLowerCase(),
            displayName: user.name,
            joinDate: user.joinDate
        })
    } catch {
        return;
    }
}

export async function getUserFromName(userName: string, collection: Collection<User>) {
    try {
        const user = await collection.find({name: userName.toLowerCase()});
        return user;
    } catch (error) {
        return null;
    }
}