import { Link } from "react-router-dom";
import React, { useState } from "react";
import * as colors from "../colors.js";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../helpers/encrypter.js";
import { decrypt } from "../helpers/decrypter.js";
import axios from "axios";
import url from "../vars.js";
import "../style.css";
function Login(props) {
  localStorage.clear()
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    pswd: "",
  });
  function handleChange(e) {
    var obj = e.target;
    setState((p) => {
      return {
        ...p,
        [obj.name]: obj.value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    let users={};
    (async ()=>{
       users=await axios.post(url+'/getuser',{username:state.username,password:state.pswd})
      .then((res)=>{
        if(res.data?.length!==0){
          console.log(res.data[0].profile);
          localStorage.setItem("test", "false");
         localStorage.setItem("user", encrypt(state.username));
         console.log(res.data[0].profile);
         localStorage.setItem('profile',encrypt(res.data[0].profile))
         navigate("home/dashboard");
        }else{
          alert('No user found')
        }
      })
      .catch(console.log)
    })()
    
    // localStorage.setItem("user", encrypt('test'));

    // navigate("home/dashboard");
    // else{
    //  localStorage.setItem("test", "true");
    // }
    
    
  }
  return (
    <>
      <div className="container">
        <div className="form">
          <form>
            <input
              type="text"
              className="input"
              placeholder="Username"
              name="username"
              value={state.username}
              onChange={handleChange}
            ></input>
            <br />
            <input type="password" 
                         className="input"
                         placeholder="Password"
                         name="pswd"
                         value={state.pswd}
                         onChange={handleChange}>
                        </input><br/>
            {/* <Link to="/home/dashboard"> */}
            <button className="btn-1"  onClick={handleSubmit}>
              {/* Login */}
              Login
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
