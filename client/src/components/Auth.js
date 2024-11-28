import { useState } from "react";

const Auth = ()=> {
  const [error,setError]=useState(null);
  const[isLogIn,setIsLogIn]=useState(true);
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const [confirmPassword,setConfirmPassword]=useState(null);

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
    await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`)

  }
    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogIn ? 'Please Log In': 'Please sign up'}</h2>
            <input type="email" placholder="Enter your e-mail adress"/>
            <input type="password" placeholder="Enter your password"/>
            {!isLogIn && <input type="password" placeholder="Confirm your password"/>}
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
  