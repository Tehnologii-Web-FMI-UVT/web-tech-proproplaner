import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../CSS/loginpage.css'

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          loginEmail,
          loginPassword,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data, "login");
  
      if (data.success) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/homepage';
      } else {
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };
  


  const handleRegisterSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:4000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        registerFirstName,
        registerLastName,
        registerEmail,
        registerPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        console.log(data,registerFirstName, "register");
        window.location.href = '/homepage';
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };
  


  return (
<div className="body-loginpage">
    <div className="login-page">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit} action="POST">
          <label>Email</label>
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className="button-login" type="submit">Log In</button>
        </form>
      </div>

      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={handleRegisterSubmit} action="POST">
          <label>First Name</label>
          <input
            type="text"
            value={registerFirstName}
            onChange={(e) => setRegisterFirstName(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            value={registerLastName}
            onChange={(e) => setRegisterLastName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
          />
          <button className="button-login" type="submit">Register</button>
        </form>
      </div>
    </div>
</div>
  );
};

export default LoginPage;
