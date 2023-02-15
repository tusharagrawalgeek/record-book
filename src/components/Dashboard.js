import React from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
function Dashboard(){
    const data=[
        {
            item:"biscuit",
            quantity:"10",
            added:"",
            expiry:"",
            description:""
        },
        {
            item:"book",
            quantity:"15",
            added:"",
            expiry:"",
            description:""
        },
        {
            item:"Box",
            quantity:"17",
            added:"",
            expiry:"",
            description:""
        }
    ];
    return(
        <>
        <div style={{
            width:"100%"
        }}>
            <div>
                <h2 style={{marginTop:"0",color:color.contrast}}>DASHBOARD</h2>
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
                    {data.map(i=>{
                        return(
                            <tr>
                               <td className="td-1">
                                {i.item.charAt(0).toUpperCase() + i.item.slice(1)}
                               </td>
                               <td className="td-1">
                                {i.quantity}
                               </td>
                               <td className="td-1">
                                {i.added}
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