import { Collection } from "mongodb";
import { User } from "../utils/types";

export async function addNewUser(user: User, collection: Collection<User>): Promise<void> {
    try {
        await collection.insertOne({
            username: user.username.toLowerCase(),
            displayName: user.username,
            joinDate: user.joinDate,
            passwordHash: user.passwordHash
        })
    } catch {
        return;
    }
}

export async function getUserFromName(userName: string, collection: Collection<User>) {
    try {
        //TODO: Use findOne instead
        const user = await collection.find({username: userName.toLowerCase()}).toArray();
        return user;
    } catch (error) {
        return null;
    }
}