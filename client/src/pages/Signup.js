import React, { useState } from "react";

function Signup() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserCredentials((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(userCredentials);
    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(userCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw resp.statusText;
        }
        return resp.json();
      })
      .then((result) => {
        console.log(result)
        // window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <h1>Signup page</h1>
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

export default Signup;
