import React, { useEffect } from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from '../vars.js';
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
                <table style={{
                    margin:"auto",
                    width:"70%",
                    borderSpacing:"0"
                }}>
                    <tr>
                        <th className="th">
                            Item
                        </th>
                        <th className="th">
                            Units
                        </th>
                        <th className="th">
                            Date added
                        </th>
                        <th className="th">
                            Expiry Date
                        </th>
                        <th className="th">
                            Description
                        </th>
                    </tr>
                    {state.items.map(i=>{
                        return(
                          
                            <tr>
                               <td className="td-1">
                                {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                               </td>
                               <td className="td-1">
                                {i.quantity}
                               </td>
                               <td className="td-1">
                                {i.date}
                               </td>
                               <td className="td-1">
                                {i.expiry}
                               </td>
                               <td className="td-1">
                                {i.description}
                               </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
        </>
    );
    
}
export default Dashboard;