import React from "react";
import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from "../vars";
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
function Import(){
    const [state,setState]=useState(
        {
            itemName:"",
            quantity:"",
            dateAdded:new Date().getDate()+" / "+(new Date().getMonth()+1)+" / "+new Date().getFullYear(),
            expiryDate:"",
            description:"",
            showBulkUpload:false,
            colNames:[],
            bulkData:[],
            colOrder:[-1,-1,-1,-1,-1],
        }
    );
    function handleOptionChange(e){
        var obj=e.target;
        state.colOrder[[obj.name]]=Number(obj.value);
        setState(p=>{
            return(
                {
                    ...p,
                }
            );
        })
    }
    function handleChange(e){
        var obj=e.target;
        if(obj.name==="expiryDate"){
            var value=obj.value;
            if(state.expiryDate.length===1){
                value=value+" / ";
            }
            setState(p=>{
                return({
                    ...p,
                    [obj.name]:value
                });
            });
        }else
        setState(p=>{
            return({
                ...p,
                [obj.name]:obj.value
            });
        });
    }
    function handleSubmit(e){
        if(e.target.getAttribute("name")==="singleAddButton"){
        const data={
            name:state.itemName,
            quantity:state.quantity,
            date:state.dateAdded,
            expiry:state.expiryDate,
            description:state.description
        }
        axios.post(url+'/setitem',data)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
        }
        if(e.target.getAttribute("name")==="bulkAddButton"){
            state.bulkData.map((i,ind)=>{
                if(ind!==0){
                const data={
                    name:state.colOrder[0]===-1?"":i[state.colOrder[0]],
                    quantity:state.colOrder[1]===-1?"":i[state.colOrder[1]],
                    date:state.colOrder[2]===-1?state.dateAdded:i[state.colOrder[2]],
                    expiry:state.colOrder[3]===-1?"":i[state.colOrder[3]],
                    description:state.colOrder[4]===-1?"":i[state.colOrder[4]]
                }
                axios.post(url+'/setitem',data)
                .then(res=>{
                    console.log(res.data);
                })
                .catch(err=>{
                    console.log(err);
                })
                console.log(data);
            }
            })
        }
    }
    function handleClick(e){
        var obj=e.target.getAttribute("name");
        setState(p=>{
            return({
                ...p,
                [obj]:!state.showBulkUpload
            })
        })
        
    }
    function fileHandler (event){
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
          if(err){
            console.log(err);            
          }
          else{
            console.log(resp.cols,resp.rows);
            const data=resp.rows;
            const colNames=data[0];
            setState(p=>{
                return(
                    {
                        ...p,
                        colNames:colNames,
                        bulkData:data
                    }
                );
            });
          }
        });                  
    }
    return(
        <>  {console.log(state.colOrder)}
            <div style={{
            width:"100%"
            }}>
                <div>
                    <h2 style={{marginTop:"0",color:color.contrast}}>IMPORT / ADD ITEMS</h2>
                </div>
                <div style={{
                    // background:"red",
                    margin:"auto",
                    marginTop:"4em"
                }}>
                    <table style={{
                        margin:"auto",
                        width:"70%",
                        padding:"2em",
                        borderSpacing:"0",
                        borderRadius:"2px",
                        background:"#2E333C",
                        boxShadow:"1px 1px 2px 0px black"
                    }}>
                    {!state.showBulkUpload?
                    <>
                    <tr>
                        <td className="tditem">

                            ITEM NAME  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        
                        <input
                        className="inputitem"
                        name="itemName"
                        value={state.itemName}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            QUANTITY  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="quantity"
                        value={state.quantity}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                        DATE ADDED
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="dateAdded"
                        value={state.dateAdded}
                        onChange={handleChange}
                        readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            EXPIRY DATE
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input 
                        className="inputitem"
                        name="expiryDate"
                        value={state.expiryDate}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">

                             DESCRIPTION  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <input
                        className="inputitem"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="td-add-btn">
                            <button className="btn-add" onClick={handleSubmit} name="singleAddButton">Add</button>
                        </td>
                    </tr>
                    </>
                    :
                    <>
                    <>
                    <tr>
                        <td className="tditem">
                        Select an excel file  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        
                        <input
                        type="file"
                        className="inputitem"
                        id="fileUpload"
                        // value={state.itemName}
                        onChange={fileHandler}
                        />
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            ITEM NAME  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={0} id="itemNameOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                            
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            QUANTITY  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={1} id="quantityOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                        DATE ADDED
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={2} id="quantityOption">
                            <option value={-1} >{state.dateAdded}</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">
                            EXPIRY DATE
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={3} id="quantityOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td className="tditem">

                             DESCRIPTION  
                        </td>
                        <td className="tditem">
                            :
                        </td>
                        <td className="tditem">
                        <select className="inputitem" style={{background:"#2E333C"}} onChange={handleOptionChange} name={4} id="quantityOption">
                            <option value={-1} >--Select column name--</option>
                            {state.colNames.map((i,ind)=>{
                                return(
                                <option  value={ind}>{i}</option>
                                );
                            })}
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="td-add-btn">
                            <button className="btn-add" onClick={handleSubmit} name="bulkAddButton">Add Items</button>
                        </td>
                    </tr>
                    </>
                    </>}
                    </table>
                </div>
                {/* {!state.showBulkUpload&& */}
                <>
                <div style={{padding:"20px", width:"100%"}}> 
                <button name="showBulkUpload" onClick={handleClick}>{state.showBulkUpload?"Cancel":"Bulk Upload"}</button>
                </div>
                </> 
                {/* } */}
            </div>
        </>
    );
}
export default Import;