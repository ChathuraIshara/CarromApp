import { Cookies } from 'react-cookie';
import { account } from '../appwrite.config'
import { authUser, encrypt, setUserSession } from './auth';

export const loginUser = async (email: string, password: string) => {

    try {
        console.log(email, password);
        const session = await account.createEmailPasswordSession(email, password);
        console.log("Session created:", session.$id);
        const encryptedText = encrypt(session.$id);
        setUserSession(`token`, encryptedText);
        console.log('auth',authUser())
 
        return session.$id;

    } catch (error: any) {
        console.error('Error logging in user:', error.message || error);
        throw error;
    }
};
