import axios from "axios";
import url from "../vars";
 async function getCurrentInventory(){
    var data=[];
     await axios.get(url+'/getitem')
        .then(res=>{
            data= res.data.data;
        })
        .catch(err=>{
            console.log(err);
            // return null;
        })
    return data;
}
export default getCurrentInventory;