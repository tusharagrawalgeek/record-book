import "./App.css";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import Import from "./components/Import";

import Export from "./components/Export";
import DeleteOptions from "./components/DeleteOptions";
import Delete from "./components/Delete";
import NewUser from "./components/NewUser";
import Users from "./components/Users";
import url from "./vars";
import axios from "axios";
import { decrypt } from "./helpers/decrypter";
import { encrypt } from "./helpers/encrypter";
function App() {
  const [state, setState] = useState({
    authenticated: false,
  });
  // function authorise(p){
  //   console.log("Authentication changed to "+p);
  //     setState(prev=>{
  //         return({
  //             ...prev,
  //             authenticated:p
  //         });
  //     });
  // }
  // localStorage.clear();

  // axios.interceptors.request.use(function (config) {
  //   let url='';
  //   if (localStorage.getItem("test") === "true") {
  //     url ="https://test-recordbook-backend.onrender.com";
  //   } else {
  //     url= "https://recordbookapi.onrender.com";
  //   }
  //   const ogurl=String(config.url).split('/')
  //   ogurl[2]=url.split('/')[2]
  //   return {...config,url:ogurl.join('/')};
  // }, function (error) {
  //   // Do something with request error
  //   return Promise.reject(error);
  // });
  // const profile = decrypt(localStorage.getItem("profile")?localStorage.getItem("profile"):encrypt(''));
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="dashboard" element={<Dashboard />} />
                <Route path="import" element={<Import />} />
                <Route path="delete" element={<DeleteOptions />} />
                <Route path="export" element={<Export />} />
                <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </Router>
      {/* <Login/> */}
    </>
  );
}
export default App;
