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
import Dashboard from './components/Dashboard';
import Import from './components/Import';
import Delete from './components/Delete';
function App(){
  const [state,setState]=useState(
    {
        authenticated:false
    }
    );
// function authorise(p){
//   console.log("Authentication changed to "+p);
//     setState(prev=>{
//         return({
//             ...prev,
//             authenticated:p
//         });
//     });
// }
    return(
      <>
      <Router>
        <Routes>
        <Route path="/" element={<Login/>} />
        {/* <Route path="/homepage" element={<HomePage/>}/> */}
        <Route path="/home" element={<HomePage/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="import" element={<Import/>}/>
          <Route path="delete" element={<Delete/>}/>
        </Route>
        
      </Routes>
      </Router>
      {/* <Login/> */}
      hey
      </>
    );
}
export default App;
