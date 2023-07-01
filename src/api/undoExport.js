import React from "react";
import axios from "axios";
import url from "../vars";
async function undoExport(id){
    var ans;
    await axios.post(url+"/undoExport/"+id)
    .then(resp=>{
        console.log(resp);
        ans=true;
    })
    .catch(err=>{
        // ans=false;
        ans=null;
    })
    return ans;
}
export default undoExport;