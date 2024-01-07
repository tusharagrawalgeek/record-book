
import CryptoJS from "crypto-js";
import {key} from './key';
export const encrypt=(text)=>{
    const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        key
      ).toString();
        return data;
}