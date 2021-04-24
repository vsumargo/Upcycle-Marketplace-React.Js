function RegisterEmailPasswordForm(props) {
  const form = (
    <form onSubmit={props.handleNext}>
      <label htmlFor="email"> Email:</label>
      <input
        onChange={props.handleChange}
        type="email"
        id="email"
        name="email"
        placeholder="Enter email address"
        value={props.userCredentials.email}
      />
      <label htmlFor="password">Password:</label>
      <input
        onChange={props.handleChange}
        type="password"
        id="password"
        name="password"
        placeholder="Enter password"
        value={props.userCredentials.password}
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        onChange={props.handleChange}
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Enter password"
        value={props.userCredentials.confirmPassword}
      />
      {(props.isEmailValid === true && props.checkPassword === true) && <button>Next</button>}
    </form>
  );

  return form;
}

export default RegisterEmailPasswordForm;
