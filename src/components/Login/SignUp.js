import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useHistory } from "react-router-dom";


function SignUp({ setIsRegistered }) {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSignUp() {
    try {
      const res = await axios.post(
        "https://whispering-cove-66440.herokuapp.com/auth/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      console.log(res);
      if (!res.data.user) {
        setError(res.data);
      }
      else{
        setIsRegistered(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="login--container">
      <div className="login--modal">
        <GrClose onClick={() => history.goBack()} className="close--btn" />
        <div className="login--title">
          <h1>YOUR ACCOUNT FOR</h1>
          <h1>
            EVERYTHING <span style={{ color: "#D97706" }}>TREKKART</span>
          </h1>
        </div>
        <div className="login--input">
          <input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="login--btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <p
          onClick={() => setIsRegistered(true)}
          style={{ color: "#A7A7A7", cursor: "pointer" }}
        >
          Sign In
        </p>
      </div>
    </div>
  );
}

export default SignUp;
