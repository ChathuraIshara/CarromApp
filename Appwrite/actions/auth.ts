import CryptoJS from 'crypto-js';

const key = '12345678901234567890123456789012'; 
export const setUserSession = (key: string, value: string): void => {
  sessionStorage.setItem(key, value);
};

export const getUserSession = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const removeUserSession = (key: string): void => {
  sessionStorage.removeItem(key);
};
export const encrypt = (text: string): string => {
    const ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext;
}

export const decrypt = (encryptedText: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export const authUser =()=>{ 
  const value =getUserSession('token');
  try {
    if(value){
    return decrypt(value);
  }
  } catch (error) {
    console.error('Error logging in user:', error.message || error);
    throw error;
  }

}

