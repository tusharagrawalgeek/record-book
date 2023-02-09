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
        e.preventDefault();
        console.log(state.username,state.pswd);
    }
    return(
        <>
            <div className="container">
                <div className="form">
                    <form onSubmit={handleSubmit}>
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
                        <button
                         className="btn-1" 
                         type="submit">
                            Login
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
}
export default Login;