import React, { useState, useContext } from "react";
import {Redirect} from 'react-router-dom';
import IsLoggedinContext from '../utils/IsLoggedinContext'

function Login(props) {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(null);

  const status = useContext(IsLoggedinContext)

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserCredentials((prevState) => {
      return { ...prevState, [name]: value };
    });
  }


  function handleSubmit(event) {
    event.preventDefault();
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          setLoginStatus(false);
          setUserCredentials({email:'',password:''})
          return;
        }

        if (resp.status === 200) {
          status.setIsLoggedin(true);
          window.location = '/'
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick (event) {
    event.preventDefault();
    setLoginStatus(null);
  }

  return (
    <div>
      <h1>Login page</h1>
      { loginStatus === false &&  <div>Incorect email or password. <span onClick={handleClick}>x</span></div>  }
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> Email:</label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Enter email address"
          value={userCredentials.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          value={userCredentials.password}
        />
        <button >submit</button>
      </form>
    </div>
  );
}

export default Login;
