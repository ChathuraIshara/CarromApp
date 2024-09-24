import { ID, Query } from "node-appwrite";
import { player, user } from "../../types";
import { account, DATABASE_ID, databases, PLAYER_COLLECTION_ID, users } from "../appwrite.config";

export const createUser = async (user: user ) => {
    console.log("create user data", user);
    try {
        const newUser = await account.create(
            ID.unique(), 
            user.email,
            user.password,
            user.name
        );

        console.log("new user", newUser);
        return newUser;

    } catch (error: any) {
        if (error && error?.code === 409) {
            // Handle conflict (user already exists)
            const existingUser = await users.list([
                Query.equal('email', [user.email])  // Query by email (or use index)
            ]);
            return existingUser?.users[0];  // Return the existing user
        } else {
            console.error("Error creating user:", error);
            throw error;
        }
    }
};

export const createplayer = async (player: player,id:string) => {

    try {
        // Create a new player
        const newPlayer = await databases.createDocument(
            DATABASE_ID, // Database ID
            PLAYER_COLLECTION_ID, // Collection ID
            id,
            player, 
    
        );
        console.log("new player", newPlayer);
        return newPlayer;

    } catch (error: any) {
        console.error("Error creating player:", error);
        throw error;
    }
}