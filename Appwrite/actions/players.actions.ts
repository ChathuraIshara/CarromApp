import { ID, Query } from "node-appwrite";
import { Player } from "../../types";
import { users } from "../appwrite.config";

export const createUser  =async (user :Player)=>{
    try{
        const newUser =await users.create(
            ID.unique(),
            user.name,
            user.index.toString()
        )
    }catch(error:any){
        if(error && error?.code==409){
            const document =await users.list([
                Query.equal('inex',[user.index])
            ])
            return document?.users[0]
        }

    }
}