import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function RegisterEmailPasswordForm(props) {
  const form = (
    <form onSubmit={props.handleNext}>
      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        variant="outlined"
        onChange={props.handleChange}
        value={props.userCredentials.email}
        style={{ width: "100%", margin: "8px 0" }}
      />
      <TextField
        onChange={props.handleChange}
        type="password"
        id="password"
        name="password"
        label="Password"
        value={props.userCredentials.password}
        variant="outlined"
        style={{ width: "100%", margin: "8px 0" }}
      />
      <TextField
        onChange={props.handleChange}
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        value={props.userCredentials.confirmPassword}
        variant="outlined"
        style={{ width: "100%", margin: "8px 0" }}
      />
      {props.isEmailValid === true && props.checkPassword === true ? (
        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%", margin: "8px 0" }}
          type="submit"
        >
          Next
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          disabled
          style={{ width: "100%", margin: "8px 0" }}
          type="submit"
        >
          Next
        </Button>
      )}
    </form>
  );

  return form;
}

export default RegisterEmailPasswordForm;
