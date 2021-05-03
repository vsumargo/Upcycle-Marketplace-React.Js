import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RegisterEmailPasswordForm from "../components/forms/RegisterEmailPasswordForm.js";
import UserDetailsForm from "../components/forms/UserDetailsForm.js";
import useEmail from "../utils/useEmail.js";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

function Signup() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [goNext, setGoNext] = useState(false);
  const history = useHistory();

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    address: "",
    suburb: "",
    postcode: "",
    state: "",
    country: "AUS",
    mobile: "",
    postList: [],
    watchList: [],
    userId: "",
  });

  const emailValid = useEmail(userCredentials.email, 1000);

  useEffect(() => {
    if (emailValid === null) {
      return setIsEmailValid(emailValid);
    }
    if (emailValid === false) {
      return setIsEmailValid(emailValid);
    }
    return setIsEmailValid(emailValid);
  }, [emailValid]);

  useEffect(() => {
    if (
      userCredentials.password === "" ||
      userCredentials.confirmPassword === ""
    ) {
      return setCheckPassword(null);
    }
    if (userCredentials.password !== userCredentials.confirmPassword) {
      return setCheckPassword(false);
    }

    return setCheckPassword(true);
  }, [userCredentials]);

  useEffect(() => {
    if (!isEmailValid || !checkPassword) {
      setGoNext(false);
    }
  }, [isEmailValid, checkPassword]);

  function handleChangeEmailForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserCredentials((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleNextButton(event) {
    event.preventDefault();
    if (isEmailValid === true && checkPassword === true) {
      return setGoNext(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    function validateUserDetails() {
      if (
        userDetails.firstname === "" ||
        userDetails.lastname === "" ||
        userDetails.address === "" ||
        userDetails.suburb === "" ||
        userDetails.postcode === "" ||
        userDetails.state === "" ||
        userDetails.mobile === ""
      ) {
        return false;
      }
      return true;
    }

    if (!validateUserDetails()) {
      return;
    }

    const { email, password } = userCredentials;
    fetch("/api/register/user", {
      method: "POST",
      body: JSON.stringify({ email, password, userDetails }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw resp.statusText;
        }
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChangeUserDetailsForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  // function displayPasswordErrorMsg(value) {
  //   if (value === false) {
  //     return <div>Password does not match</div>;
  //   }
  //   if (value === "password") {
  //     return <div>Please enter password</div>;
  //   }
  // }

  return (
    <div>
      <Grid
        container
        spacing={4}
        style={{ height: "89vh" }}
        alignItems="flex-start"
        justify="center"
      >
        <Grid item xs={12} sm={5} md={4}>
          <h1>Sign Up</h1>
          <RegisterEmailPasswordForm
            userCredentials={userCredentials}
            isEmailValid={isEmailValid}
            checkPassword={checkPassword}
            handleChange={handleChangeEmailForm}
            handleNext={handleNextButton}
          />
          {isEmailValid ? (
            <Alert severity="success">Email is Valid</Alert>
          ) : (
            isEmailValid === false && (
              <Alert severity="error">Email address already exist</Alert>
            )
          )}

          {checkPassword ? (
            <Alert severity="success">Password Matched</Alert>
          ) : (
            checkPassword === false && (
              <Alert severity="error">Password does not match</Alert>
            )
          )}
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          {goNext === true && (
            <>
              <h1>Personal Details:</h1>
              <UserDetailsForm
                userdetails={userDetails}
                handleChange={handleChangeUserDetailsForm}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;
