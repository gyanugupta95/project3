import React, { useState} from "react";
import axios from 'axios';
import './Authentication.css'
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
//import {useForm} from 'react-hook-form'
const Reg = () => {
    //const {error}=useForm();
    const [userInfo, setUserInfo] = useState();
    const { register, handleSubmit, errors } = useForm();    
    const navigate = useNavigate();
    const [data, setData] = useState({
        id: new Date().getTime(),
        Name: "",
        Password: "",
        Email: "",
        ConfirmPassword:""
    })
    //console.log(error);
    const handleInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
        console.log(data)
        setData(" ")
    }
    const onSubmit = (data) => {
    if(data.Password==data.ConfirmPassword && data.Name&&data.Email&&data.Password&&data.ConfirmPassword!=="")
        {
        setUserInfo(data);
        console.log(data);
       console.log( userInfo)
        }
        else{
            alert("password not matched")
        }
      };
    let apipost = (e) => {
        axios.post("http://localhost:3001/posts", userInfo)
            .then(res => {
                console.log("==================",res)
                if(res.data.Email&&res.data.Name!==""){
                alert("registartion succesfull")
                navigate("/")
                }
                // else{
                //     alert("registration not successful")
                //     navigate("/Reg")
                // }
            })
            .catch(er => {
                console.log("no data sorry ", er);
                console.log("===",er);
            });
    }
    console.log(data);
    return (
    <div className="form-box">
        {/* <pre>{JSON.stringify(userInfo, undefined, 2)}</pre> */}

         <form className="input-group" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading-reg">User Ragistration</h1>
            <div className="input-field" >
                {/* <label className="lable">Username: </label> */}
                <input type="text" placeholder="username" className="field"
                    name="Name" value={data.Name}
                    ref={register({ required: "Username is required" })}  onChange={handleInput} />                
                    </div>
                    <span className="heading">{errors.Name?.message}</span>   
                    
                <div className="input-field" >
                    {/* <label className="lable">Email: </label> */}
                    <input type="email" placeholder="Email" className="field"
                        value={data.Email} name="Email" 
                        ref={register({
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "This is not a valid email",
                            },
                          }) } onChange={handleInput} />
                                              
                </div>
                <span className="heading">{errors.Email?.message}</span> 
             
                <div className="input-field"  > 
                    {/* <label className="lable">Password: </label> */}
                    <input type="password" placeholder="password" className="field"
                        name="Password" value={data.Password}  
                        ref={register({
                            required: "Password is required",
                            minLength: {
                              value: 4,
                              message: "Password must be more than 4 characters",
                            },
                            maxLength: {
                              value: 10,
                              message: "Password cannot exceed more than 10 characters",
                            },
                          })} onChange={handleInput} /> 
                                              
                </div>
                <span className="heading">{errors.Password?.message}</span>  
              
                <div className="input-field"  > 
                    {/* <label className="lable">Confirm Password: </label> */}
                    <input type="password" placeholder="confirm password" className="field"
                        name="ConfirmPassword" value={data.ConfirmPassword}  
                        ref={register({
                            required: "Confirm Password is required",
                            minLength: {
                              value: 4,
                              message: "Password must be more than 4 characters",
                            },
                            maxLength: {
                              value: 10,
                              message: "Password cannot exceed more than 10 characters",
                            },
                          })} onChange={handleInput} />
                                              
                </div>
                <p className="heading">{errors.ConfirmPassword?.message}</p> 
               
                <input className="submit-btn" type="submit" onClick={apipost}/>
                
                </form>           
            </div>   
    )
}
export default Reg;