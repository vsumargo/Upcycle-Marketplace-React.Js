import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// import Select from "@material-ui/core/Select";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
import mastercard from "../logo/mastercard.svg";
import visa from "../logo/visa.svg";
import amex from "../logo/amex.svg";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function PaymentFormsStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [displayAddress, setDisplayAddress] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState({
    firstname: "",
    lastname: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
    mobile: "",
  });
  const history = useHistory();
  const [paymentDetails, setPaymentDetails] = useState({
    cardnumber: "",
    expiration: "",
    cardname: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const steps = getSteps();

  function getSteps() {
    return ["Shipment Details", "Payment Details"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstname"
                name="firstname"
                label="First Name"
                type="text"
                variant="outlined"
                value={shipmentDetails.firstname}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastname"
                name="lastname"
                label="Last Name"
                type="text"
                variant="outlined"
                value={shipmentDetails.lastname}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                name="address"
                label="Street Number & Street Name"
                type="text"
                variant="outlined"
                value={shipmentDetails.address}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="suburb"
                name="suburb"
                label="Suburb"
                type="text"
                variant="outlined"
                value={shipmentDetails.suburb}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                select
                label="State/Territory"
                // SelectProps={{
                //   native: true,
                // }}
                value={shipmentDetails.state}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem value="act">ACT</MenuItem>
                <MenuItem value="nsw">NSW</MenuItem>
                <MenuItem value="qld">QLD</MenuItem>
                <MenuItem value="sa">SA</MenuItem>
                <MenuItem value="vic">VIC</MenuItem>
                <MenuItem value="wa">WA</MenuItem>
              </TextField>
              {/* <FormControl
                variant="outlined"
                style={{ width: "100%", margin: "8px 0" }}
              >
                <InputLabel id="state">State</InputLabel>
                <Select labelId="state" id="state" name="state" label="state">
                  <MenuItem value="act">ACT</MenuItem>
                  <MenuItem value="nsw">NSW</MenuItem>
                  <MenuItem value="qld">QLD</MenuItem>
                  <MenuItem value="sa">SA</MenuItem>
                  <MenuItem value="vic">VIC</MenuItem>
                  <MenuItem value="wa">WA</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="postcode"
                name="postcode"
                label="Postcode"
                type="text"
                variant="outlined"
                value={shipmentDetails.postcode}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mobile"
                name="mobile"
                label="Mobile phone"
                type="text"
                variant="outlined"
                value={shipmentDetails.mobile}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid
            container
            spacing={2}
            style={{ border: "1px solid black", padding: "6px" }}
          >
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>Credit Card</span>
              <span>
                <img
                  src={mastercard}
                  style={{ boxShadow: "none", margin: "0 3px" }}
                  height="48px"
                  width="48px"
                />
                <img
                  src={visa}
                  style={{ boxShadow: "none", margin: "0 3px" }}
                  height="48px"
                  width="48px"
                />
                <img
                  src={amex}
                  style={{ boxShadow: "none", margin: "0 3px" }}
                  height="48px"
                  width="48px"
                />
              </span>
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="cardnumber"
                name="cardnumber"
                label="Credit Card Number"
                type="text"
                variant="outlined"
                value={paymentDetails.cardnumber}
                onChange={handlePaymentInput}
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="expiration"
                name="expiration"
                label="MM/YY"
                type="text"
                variant="outlined"
                value={paymentDetails.expiration}
                onChange={handlePaymentInput}
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="cardname"
                name="cardname"
                label="Name on Card"
                type="text"
                variant="outlined"
                value={paymentDetails.cardname}
                onChange={handlePaymentInput}
                autoComplete="off"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="cvv"
                name="cvv"
                label="CVV"
                type="text"
                variant="outlined"
                value={paymentDetails.cvv}
                onChange={handlePaymentInput}
                autoComplete="off"
                fullWidth
              />
            </Grid>
          </Grid>
        );
      default:
        return "Unknown step";
    }
  }

  const handleNext = (event) => {
    event.preventDefault();
    const index = event.currentTarget.getAttribute("index");
    if (index !== "0") {
      return setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (index === "0") {
      setDisplayAddress(true);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      return;
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    const index = event.currentTarget.getAttribute("index");
    if (index === "0") {
      return setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    if (index !== "0") {
      setDisplayAddress(false);
      return setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  function displayShippingAddress(step) {
    const style =
      displayAddress.toString() === "true"
        ? { display: "block", paddingLeft: "24px" }
        : { display: "none" };

    // eslint-disable-next-line no-debugger
    switch (step) {
      case 0:
        return (
          <div style={style}>
            <Typography variant="subtitle2">
              {shipmentDetails.firstname + " " + shipmentDetails.lastname}
            </Typography>
            <Typography variant="body2">{shipmentDetails.mobile}</Typography>
            <Typography variant="body2">{shipmentDetails.address}</Typography>
            <Typography variant="body2">
              {shipmentDetails.suburb +
                ", " +
                shipmentDetails.postcode +
                ", " +
                shipmentDetails.state.toUpperCase()}
            </Typography>
          </div>
        );
      default:
        return null;
    }
  }

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setShipmentDetails((prevState) => ({ ...prevState, [name]: value }));
  }

  function handlePaymentInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    setPaymentDetails((prevState) => ({ ...prevState, [name]: value }));
  }

  function handlePayNow(event) {
    event.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      fetch("/api/post/sold", {
        method: "PUT",
        body: JSON.stringify({ itemId: props.itemId }),
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
          console.log(result);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            props.setSoldState(true);
            history.go(0);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              {label}
              {index === 0 ? displayShippingAddress(index) : ""}
            </StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <span>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                      index={index}
                    >
                      Back
                    </Button>
                  </span>
                  <span style={{ position: "relative" }}>
                    <Button
                      variant="contained"
                      color={
                        activeStep === steps.length - 1
                          ? "secondary"
                          : "primary"
                      }
                      onClick={
                        activeStep === steps.length - 1
                          ? handlePayNow
                          : handleNext
                      }
                      disabled={loading}
                      className={classes.button}
                      index={index}
                    >
                      {activeStep === steps.length - 1 ? "Buy Now" : "Next"}
                    </Button>
                  </span>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper
          square
          elevation={0}
          className={classes.resetContainer}
          style={{ position: "relative" }}
        >
          {loading ? (
            <CircularProgress
              size={68}
              style={{
                color: "#47d147",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -34,
                marginLeft: -34,
              }}
            />
          ) : (
            <Fab
              aria-label="save"
              color="primary"
              style={
                success
                  ? {
                      backgroundColor: "#47d147",
                    }
                  : {}
              }
            >
              {success && <CheckIcon />}
            </Fab>
          )}
          {success && <Typography>Payment Successful</Typography>}
        </Paper>
      )}
    </div>
  );
}

export default PaymentFormsStepper;
