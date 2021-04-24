import React, { useState, useEffect } from "react";
import RegisterEmailPasswordForm from "../components/forms/RegisterEmailPasswordForm.js";
import UserDetailsForm from "../components/forms/UserDetailsForm.js";
import useEmail from "../utils/useEmail.js";

function Signup() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [goNext, setGoNext] = useState(false);

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

  useEffect(()=> {
    if(userCredentials.password === '' || userCredentials.confirmPassword === ''){
      return setCheckPassword(null);
    }
    if( userCredentials.password !== userCredentials.confirmPassword){
      return setCheckPassword(false)
    }
    
    return setCheckPassword(true)
  }, [userCredentials])

  useEffect(() => {
    if (!isEmailValid || !checkPassword){
      setGoNext(false);
    }
  },[isEmailValid,checkPassword])

  function handleChangeEmailForm(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserCredentials((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleNextButton(event) {
    event.preventDefault();
    if (isEmailValid === true && checkPassword === true){
      return setGoNext(true);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    function validateUserDetails (){
      if (userDetails.firstname === '' || 
      userDetails.lastname === ''|| 
      userDetails.address === '' || 
      userDetails.suburb === ''||  
      userDetails.postcode === ''||  
      userDetails.state === ''||  
      userDetails.mobile === ''){
        return false
      }
      return true
    }

    if(!validateUserDetails()){
      return;
    }

    const {email,password} = userCredentials;
    fetch("/api/register/user", {
      method: "POST",
      body: JSON.stringify({email,password,userDetails}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status !== 200) {
          throw resp.statusText;
        }
        window.location='/login'
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
      <h1>Signup page</h1>
      <RegisterEmailPasswordForm
        userCredentials={userCredentials}
        isEmailValid={isEmailValid}
        checkPassword={checkPassword}
        handleChange={handleChangeEmailForm}
        handleNext={handleNextButton}
      />
      {isEmailValid ? (
        <div>Email is Valid</div>
      ) : (
        isEmailValid === false && <div>Email address already exist</div>
      )}

      {checkPassword ? (
        <div>Password Matched</div>
      ) : (
        checkPassword === false && <div>Password does not match</div>
      )}

      {goNext === true && (
        <UserDetailsForm
          userdetails={userDetails}
          handleChange={handleChangeUserDetailsForm}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Signup;
