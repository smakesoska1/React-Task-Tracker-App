import { useState } from "react";
import {useCookies} from 'react-cookie';

const Auth = ()=> {
  const [cookies,setCookie,removeCookie]=useCookies(null);
  const [error,setError]=useState(null);
  const[isLogIn,setIsLogIn]=useState(true);
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const [confirmPassword,setConfirmPassword]=useState(null);


  console.log(cookies);


  const viewLogin=(status)=>{
    setError(null);
    setIsLogIn(status);
    
  }

  const handleSubmit=async(e,endpoint)=>{
    e.preventDefault();
    if(!isLogIn && password!== confirmPassword){
      setError('Make sure you enter the same password!');
      return
    }
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email,password})

    })
    const data=await response.json();
    if(data.detail){
      setError(data.detail);
    }else{
      setCookie('Email',data.email)
      setCookie('AuthToken',data.token);
      window.location.reload();
    }
   
  }
    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogIn ? 'Please Log In': 'Please sign up'}</h2>
            <input type="email" placholder="Enter your e-mail adress" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
            {!isLogIn && <input type="password" placeholder="Confirm your password" onChange={(e)=>setConfirmPassword(e.target.value)}/>}
            <input type="submit" className="create" onClick={(e)=>handleSubmit(e,isLogIn? 'login':'signup')}/>
            {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button onClick={()=>viewLogin(false)}>Sign up</button>
            <button onClick={()=>viewLogin(true)}>Log in</button>
          </div>

        </div>      
      </div>
    );
  }
  
  export default Auth;
  