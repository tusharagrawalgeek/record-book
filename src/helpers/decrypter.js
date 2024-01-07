import CryptoJS from 'crypto-js';
import  {key}  from './key';
export const decrypt=(data)=>{
    const bytes= CryptoJS.AES.decrypt(data , key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}