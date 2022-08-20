import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackgroundAnimate from '../../BackgroundAnimate';

import "./login.css";
import axios from "axios";

const LogIn = () => {

  const navigate=useNavigate();
const cred=JSON.parse(localStorage.getItem("cred"))
 useEffect(()=>{
if(cred){
navigate("/home")
}
 })

  const [message,setMessage]=useState("")
  const [user,setUser]=useState({
    email:"",
    passcode:""
  });
  const changeUserData=(e)=>{
let {id,value}=e.target;
setUser({
  ...user,[id]:value
})

  }
  const checkData=()=>{
    if(user.passcode.length<=7){
      alert("Weak password")
      return false
    }
    return true
  }
  const further=(x)=>{
     localStorage.setItem("cred",JSON.stringify(x));
    
     return navigate('/home');
  }
  const loginUser=()=>{
   if(!checkData()){
    return;
   }
    axios.post("https://supplynote.herokuapp.com/user/signin",{
      "email":user.email,
      "password":user.passcode
    }).then((res)=>{
     
      further(res.data)
    }).catch((err)=>{
     
      alert(err.response.data.err)
    })
    }
  const signupUser=()=>{
    if(!checkData()){
      return;
     }
    axios.post("https://supplynote.herokuapp.com/user/signup",{
      "email":user.email,
      "password":user.passcode
    }).then((res)=>{
      further(res.data)
    }).catch((err)=>{
      alert(err.response.data.err)
    })
    }
  return (
    <div className='containertwo'>
    <BackgroundAnimate />
    <div className='login-main'> 
<h1>Mialy</h1>
    <div>

    <input onChange={changeUserData}  id='email' type="email" placeholder='Email'/>
    <br />
    <form action="">
    <input onChange={changeUserData} id='passcode' type="password"  placeholder='Password' />
    </form>
    
    <br />
    <div>
    <button onClick={loginUser} className='sign-shop'>Sign In</button><button onClick={signupUser} className='sign-shop'>Sign Up</button>
    </div>
    </div>
      
    </div>
    </div>
    
  )
}

export default LogIn


