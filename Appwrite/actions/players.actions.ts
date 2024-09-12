import { ID, Query } from "node-appwrite";
import { Player } from "../../types";
import { DATABASE_ID, databases, PLAYER_COLLECTION_ID } from "../appwrite.config";

export const createUser  =async (user :Player)=>{
    console.log("create user data",user)
    try{
        const newUser =await databases.createDocument(
            DATABASE_ID!,
            PLAYER_COLLECTION_ID!,
            ID.unique(),
            user
        )
        console.log("new user",newUser)
    }catch(error:any){
        if(error && error?.code==409){
            const document =await databases.list([
                Query.equal('inex',[user.index])
            ])
            
        }

    }
}