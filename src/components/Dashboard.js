import React, { useEffect } from "react";
import  { useRef } from 'react';

import { useState } from "react";
import '../style.css';
import * as color from '../colors.js';
import axios from "axios";
import url from '../vars.js';
import Table from "./Table";
// import Loader from "./Loader";
import searchQuery from "./searchQuery";
import ContactUs from "../Email/sendEmail";
import emailjs from '@emailjs/browser';

function Dashboard(){
   
    const [state,setState]=useState(
        {
            items:[],
            searchValue:"",
            searchItems:[]
        }
    );
    const form = useRef();
  function sendingData(){
    return "message"
    
  }
  const sendEmail = (e) => {
    // e.preventDefault();
    console.log("clicked");
    emailjs.
    emailjs.send("service_i3urbym", "template_71pg1ee", {message:sendingData}, 'yVl57SUQeWciNRsjv')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    // emailjs.sendForm("service_i3urbym", "template_71pg1ee", form.current, 'yVl57SUQeWciNRsjv')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
  };
    function handleChange(e){
        const obj=e.target;
        const data=searchQuery(obj.value,state.items);
        setState(p=>(
            {
                ...p,
                // searchValue:obj.value,
                searchItems:data,
                [obj.name]:[obj.value]
            }
        ))
    }
    useEffect(()=>{
        console.log(url);
        // const url='http://localhost:3001/getitem'
        axios.get(url+'/getitem')
        .then(res=>{
            const items=res.data.data;
            setState(p=>{
                return({
                    ...p,
                    items:items,
                    searchItems:items
                });
            })
        })
        .catch(err=>console.log(err))
    },[]);
    return(
        <>
        {/* <Loader/> */}
        {/* <form ref={form} >
            <textarea name="message">Hello txt rishi</textarea>
        </form> */}
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
            {/* <button onClick={sendEmail}>sync data</button> */}
                <Table items={state.searchItems} searchValue={state.searchValue} handleChange={handleChange}  searchBar/>
            </div>
        </div>
        </>
    );
    
}
export default Dashboard;