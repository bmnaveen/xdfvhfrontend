import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
const InputShortener = ({ setInputValue }) => {
  const [value, setValue] = useState("");
const navigate=useNavigate()
  const handleClick = () => {
    setInputValue(value);
    setValue("");
  }
useEffect(()=>{
 const cred=JSON.parse(localStorage.getItem("cred"));
 if(!cred){
  return navigate("/")
 }
},[])
  return (
    <div className="inputContainer">
      <button className="Logout" onClick={()=>{
      localStorage.setItem("cred",JSON.stringify(null))
      return navigate("/")
      }}>Sign Out</button>
      <h1 className="mia">Mialy</h1>
      <h1>Shorten your <span>Url</span></h1>
      <div>
        <input
          type="text"
          placeholder="Enter long Url"
          value={value}
          onChange={e => setValue(e.target.value)}  
        />
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  )
}

export default InputShortener