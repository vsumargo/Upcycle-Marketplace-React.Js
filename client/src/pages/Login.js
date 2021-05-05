import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import IsLoggedinContext from "../utils/IsLoggedinContext";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const [loginStatus, setLoginStatus] = useState(null);
  const history = useHistory();

  const { setUserStat } = useContext(IsLoggedinContext);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserCredentials((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleLogin(event) {
    event.preventDefault();
    setOpenBackdrop(true);
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
          setOpenBackdrop(false);
          setUserCredentials({ email: "", password: "" });
          return;
        }

        if (resp.status === 200) {
          fetch("/api/userstatus")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setUserStat(data);
              history.push(`/`);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleClick(event) {
    event.preventDefault();
    setLoginStatus(null);
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        style={{ height: "89vh" }}
        alignItems="flex-start"
        justify="center"
      >
        <Grid item xs={12} sm={8} md={4} align="center">
          <h1>Log-in Page</h1>
          {loginStatus === false && (
            <Alert severity="error">
              Incorect email or password.
              <span
                onClick={handleClick}
                style={{ fontWeight: 600, cursor: "pointer", color: "red" }}
              >
                X
              </span>
            </Alert>
          )}
          <form autoComplete="off" onSubmit={handleLogin}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={handleChange}
              value={userCredentials.email}
              style={{ width: "100%", margin: "8px 0" }}
            />
            <TextField
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              label="Password"
              value={userCredentials.password}
              variant="outlined"
              style={{ width: "100%", margin: "8px 0" }}
            />
            {userCredentials.email === "" || userCredentials.password === "" ? (
              <Button
                variant="contained"
                color="primary"
                disabled
                style={{ width: "100%", margin: "8px 0" }}
                type="submit"
              >
                Log in
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                style={{ width: "100%", margin: "8px 0" }}
                type="submit"
              >
                Log in
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
      <Backdrop style={{ zIndex: 10, color: "#fff" }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Login;
