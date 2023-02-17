import { Link } from "react-router-dom";
import React,{useState} from "react";
import * as colors from "../colors.js";
import '../style.css';
function Login(props){
    const[state,setState]=useState(
        {
            username:"",
            pswd:""
        }
    );
    function handleChange(e){
        var obj=e.target;
        setState(p=>{
            return({
                ...p,
                [obj.name]:obj.value
            });
        });
    }
    function handleSubmit(e){
        // e.preventDefault();
        // console.log(state.username,state.pswd);
        // if(state.username==="tushar"){
        //     console.log("Username matched");
        //     return props.changeAuthentication(true);
        // }
        // return props.changeAuthentication(false);
        
    }
    return(
        <> 
            <div className="container">
                <div className="form" onSubmit={handleSubmit}>
                    <form >
                        <input type="text"
                         className="input"
                         placeholder="Username"
                         name="username"
                         value={state.username}
                         onChange={handleChange}>
                        </input><br/>
                        <input type="password" 
                         className="input"
                         placeholder="Password"
                         name="pswd"
                         value={state.pswd}
                         onChange={handleChange}>
                        </input><br/>
                        <Link to="/home/dashboard">
                        <button
                         className="btn-1" 
                         type="submit">
                            {/* Login */}
                            Login
                        </button>
                        </Link>
                    </form>

                </div>
            </div>
        </>
    );
}
export default Login;