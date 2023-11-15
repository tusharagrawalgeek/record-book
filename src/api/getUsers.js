import axios from "axios";
import url from "../vars";
async function getUsers(){
    var users;
    await axios.get(url+"/getusers")
    .then(res=>{
        users=res.data;
    })
    .catch(console.log)
    return users;
}
export default getUsers;