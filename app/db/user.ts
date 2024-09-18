// import { Collection } from "mongodb";
// import User from "../lib/models/User";

// export async function getUserFromName(userName: string, collection: Collection<UserDoc>) {
//     try {
//         const user = await collection.findOne<User>({username: userName.toLowerCase()});
//         return user;
//     } catch (error) {
//         return null;
//     }
// }