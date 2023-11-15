import React from "react";
import { useState } from "react";
import NewUser from "./NewUser";
import Table from "./Table";
import { useEffect } from "react";
import getUsers from "../api/getUsers";
import MuiTable from "./MuiTable";
function Users(){
    const[state,setState]=useState({
        display:"table",//table or form
        users:[]

    });
    function handleAddUser(){
        setState({...state,display:"form"});
    }
    function handleShowTable(){
        setState({...state,display:"table"});
    }
   
    async function getuser(){
        var allusers;
        await getUsers()
       .then(res=>{
        console.log(res);
        allusers=res;
       })
       .catch(console.log)
       console.log(allusers);
       setState({...state,users:allusers});
       }
    useEffect( ()=>{
        getuser();      
    },[state.display])
    return(
        <>
        {state.display==="table"&&
        <>
        <h2
            style={{ marginTop: "0", color: '#00ADB5', marginBottom: "0" }}
          >
            Users
          </h2>
        <MuiTable data={state.users}/>
        <button onClick={handleAddUser}>Add user</button>
        </>
        }
        {state.display==="form"&&
        <>
            <NewUser cancelForm={handleShowTable}/>
        </>
        }
        </>
    );
}
export default Users;