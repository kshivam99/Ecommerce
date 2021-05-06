import React, { useEffect, useState } from "react";
import "./Login.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


function Login() {
  const [ isRegistered, setIsRegistered] = useState(true);


  return (
    <>
    {isRegistered?<SignIn setIsRegistered={setIsRegistered} />:<SignUp setIsRegistered={setIsRegistered}/>}
    </>
  );
}

export default Login;
