import React from "react";
import { useState } from "react";
import NewUser from "./NewUser";
import Table from "./Table";
import { useEffect } from "react";
import getUsers from "../api/getUsers";
import MuiTable from "./MuiTable";
import { decrypt } from "../helpers/decrypter.js";
import { useNavigate } from "react-router-dom";
function Users(){
    const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("profile")&&decrypt(localStorage.getItem('profile'))!=='admin')
    navigate('/home/dashboard')
  },[])
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
        allusers=res;
       })
       .catch(console.log)
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