import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
const Admin = () => {

    const navigate=useNavigate();
    const cred=JSON.parse(localStorage.getItem("cred"));
    useEffect(()=>{
        if(!cred){
         return navigate("/")
        }
       },[])

const [users,setUsers]=useState([])

useEffect(()=>{
    console.log(cred.token)
axios.post("https://suppynote.herokuapp.com/user",{},{
    headers:{
        authorization: 'Bearer ' +  cred.token,
    }
}).then((res)=>{
    setUsers(res.data)
    console.log(res.data)
}).catch((err)=>{
    alert(err.response.data.err)
})
},[])

  return (
    <div className='admintable'>
        <button className="Logout" onClick={()=>{
      localStorage.setItem("cred",JSON.stringify(null))
      return navigate("/")
      }}>Sign Out</button>
<h1>Admin Panel</h1>

<div>
    <table>
       
            <tr>
<td>SI</td>
<td>Email</td>
            </tr>
     {
        users.map((e,i)=>{
            return <tr>
                <td>{i+1}</td>
                <td>{e.email}</td>
            </tr>
        })
     }
    </table>
</div>
    </div>
  )
}

export default Admin