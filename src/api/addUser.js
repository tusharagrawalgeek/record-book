import axios from "axios";
import url from "../vars";
async function addUser(user){
    // console.log(user);
    var data;
    await axios.post(url+"/setuser",user)
    .then(res=>{
        // console.log(res,{result:true});
        data=res;
    })
    .catch(err=>{
        
    })
    return data;
}
export default addUser;