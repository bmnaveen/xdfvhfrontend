import { useState } from 'react';
import './App.css';
import BackgroundAnimate from './BackgroundAnimate';
import InputShortener from './InputShortener';
import LinkResult from './LinkResult';
import {Routes,Route} from "react-router-dom" 
import LogIn from './components/login/logIn';
import PathValidator from './PathValidator';
import Admin from './components/Admin';
function App() {
  const [inputValue, setInputValue] = useState("");

  return (

    <Routes>
      <Route path='/' element={<LogIn></LogIn>}/>
      <Route path='/shortner' element={ <div className="container">

      <InputShortener setInputValue={setInputValue} />
      <BackgroundAnimate />
      <LinkResult inputValue={inputValue} />
    </div> }/>
    <Route path='/home' element={<PathValidator></PathValidator>}/>
    <Route path='/admin' element={<Admin></Admin>}/>
    </Routes>
   
  );
}

export default App;
