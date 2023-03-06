import React, { useEffect } from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from '../vars.js';
import Table from "./Table";
// import Loader from "./Loader";
function Dashboard(){
   
    const [state,setState]=useState(
        {
            items:[]
        }
    );
    useEffect(()=>{
        console.log(url);
        // const url='http://localhost:3001/getitem'
        axios.get(url+'/getitem')
        .then(res=>{
            const items=res.data.data;
            setState(p=>{
                return({
                    ...p,
                    items:items
                });
            })
        })
        .catch(err=>console.log(err))
    },[]);
    return(
        <>
        {/* <Loader/> */}
        <div style={{
            width:"100%"
        }}>
            <div>
                <h2 style={{marginTop:"0",color:color.contrast}}>DASHBOARD </h2>
            </div>
            <div style={{
                margin:"auto",
                marginTop:"4em"
            }}>
                <Table items={state.items}/>
            </div>
        </div>
        </>
    );
    
}
export default Dashboard;