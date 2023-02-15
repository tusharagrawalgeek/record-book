import './App.css';
import React, { useState } from 'react';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import HomePage from './components/HomePage';
function App(){
  const [state,setState]=useState(
    {
        authenticated:false
    }
);
function authorise(p){
  console.log("Authentication changed to "+p);
    setState(prev=>{
        return({
            ...prev,
            authenticated:p
        });
    });
}
    return(
      <>
      {state.authenticated?<HomePage/>:<Login changeAuthentication={authorise}/>}
      {/* <Router>
        <Routes>
        {!state.authenticated&&
        <Route path="/" element={<Login changeAuthentication={authorise}/>} />
      }</Routes>
      </Router> */}
      {/* <Login/> */}
      </>
    );
}
export default App;
