import axios from "axios";
import url from "../vars";
async function checkUsername(username){
    const data=await axios.post(url+"/findusername",{username:username}).then(res=>{
        return res;
    })
    .catch((err)=>{
        
    })
    return data;
}
export default checkUsername;