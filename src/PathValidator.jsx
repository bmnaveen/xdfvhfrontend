import React, { useEffect } from 'react'
import  {Navigate} from "react-router-dom"


const PathValidator = () => {
    

    let cred=JSON.parse(localStorage.getItem("cred"));
    
    if(cred){

if(cred.auth=="admin"){
return <Navigate to={'/admin'}/>
}


        return <Navigate to={'/shortner'}/> 
    }else{
        return <Navigate to={'/'}/> 
    }
       
       
           
       
    
  
}

export default PathValidator