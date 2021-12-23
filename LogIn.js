import React, { useState,useEffect } from "react"
import axios from 'axios';
import Reg from "./Reg";
import "./Authentication.css"
import {useNavigate,Link} from 'react-router-dom';



const LogIn = () => {
   
    
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();

    const navigate = useNavigate();

    console.log(navigate);
    const login=()=>{
        if(Email&&Password!==""){
            axios.get(`http://localhost:3001/posts?Email=${Email}&Password=${Password}`)
            .then(function(resp){ 
                console.log(resp); 
                const user=resp.data.length;            
                if(user===1)
               { navigate('/Dashboard')}
               else{
                   navigate('/')
               }
                console.log("succes",resp);
            }).catch()
        }
        else{
            alert("error")
        }
    }
    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(Email));
      }, [Email]);
    return (
        <div className="form-box">           
            <div className="input-field">
                <input type="email" placeholder="Email" className="field" onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className="input-field">
                <input type="password" placeholder="password" className="field" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <div className="input-field">
                <input type="button" className="login-btn" value="Login" onClick={login} />
            </div>
            <div className="input-field" >
                <span className="color-span">if you are not authenticate then click to the below button</span><br/>
           <button className="signup-btn"><Link to ="/Reg" > SighnUp </Link></button><br/>
            </div>
          
    
        </div>
    )
}
export default LogIn;