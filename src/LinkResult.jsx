import axios from "axios";
import { useEffect, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
const LinkResult = ({ inputValue }) => {



  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [generated,setGenerated]=useState([]);
const cred=JSON.parse(localStorage.getItem("cred"))
  function isValidURL(string) {
    var res = string.match(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
    return (res !== null)
  };

  const fetchData = () => {
    
    if(! isValidURL(inputValue)){
return alert("Type proper Url")
    } 
      setLoading(true);
     axios.post(`https://supplynote.herokuapp.com/`,{
        "long":inputValue,
      },{
        headers:{
          authorization: 'Bearer ' +  cred.token,
      }
      }).then((res)=>{
       console.log(res.data)
        setShortenLink(res.data);

        getGenerated()
      }).catch((err)=>{
        setShortenLink("")
        setError(true);
       
        let timed= setTimeout(() => {
            setError(false);
          }, 2000);
          return ()=>clearTimeout(timed)
      }).finally(()=>{
        setLoading(false);
      })
      
      
     
    
  }




  useEffect(() => {
    if(inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(()=>{
    getGenerated();
  },[])
  if(loading) {
    return <p className="noData">Loading...</p>
  }
  if(error) {
    return <p className="noData">Something went wrong :(</p>
  }

  
  const getGenerated= ()=>{
   
    axios.post("https://supplynote.herokuapp.com/mialy",{},{
      headers:{
        authorization: 'Bearer ' +  cred.token,
    }
    }).then((res)=>{
      
      setGenerated(res.data)
       
      }).catch((err)=>{
        alert(err.response.data.err)
     
      })
  }

const deleteData=(x)=>{
  
  axios.post(`https://supplynote.herokuapp.com/mialy/${x._id}`,{},{
    headers:{
      authorization: 'Bearer ' +  cred.token,
  }
  }).then((res)=>{
    
  alert(res.data.status)
  return getGenerated()
     return 
    }).catch((err)=>{
      alert(err.response.data.err)
   
    })
}


  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>
          <CopyToClipboard
            text={shortenLink}
            onCopy={() => setCopied(true)}
          >
            <button className={copied ? "copied" : ""}>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )}
      
      <div className="shoturls">
{
  generated.map((e)=>{
    return <div>
<span>Long url: {e.longurl}</span>
<span>Short url: <a target="_blank" rel='noopener noreferrer'  href={e.shorturl}  >{e.shorturl} </a></span>
<span> <button onClick={()=>{
  deleteData(e)
}}>Delete</button></span>

    </div>
  })
}
      </div>
    </>
  )
}

export default LinkResult