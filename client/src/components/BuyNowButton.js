import React, { useState, useEffect, useContext } from "react";
import IsLoggedinContext from "../utils/IsLoggedinContext";
import PaymentFormsStepper from "./PaymentFormsStepper.js";
import PaymentItemDetails from "./PaymentItemDetails.js";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import ListItemText from "@material-ui/core/ListItemText";
// import ListItem from "@material-ui/core/ListItem";
// import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function BuyNowButton(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { userStat } = useContext(IsLoggedinContext);
  const [currentUser, setCurrentUser] = useState(true);
  useEffect(() => {
    setCurrentUser(userStat.userId);
  }, [userStat.userId]);

  const handleClickOpen = () => {
    if (userStat.isLoggedin === true && currentUser !== props.sellerId) {
      return setOpen(true);
    }
    console.log(`You need to login to buy the item`);
    props.setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {currentUser === props.sellerId || props.sold === "true" ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<CreditCardIcon />}
          disabled
          className={props.className}
          style={{
            margin: "8px 0",
          }}
        >
          Buy Now
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          startIcon={<CreditCardIcon />}
          className={props.className}
          style={{
            margin: "8px 0",
          }}
        >
          Buy Now
        </Button>
      )}

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Payment & Shipping Details
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <Grid item xs={12} sm={7} style={{ padding: "0 36px" }}>
            <PaymentFormsStepper
              itemId={props.itemId}
              setSold={props.setSold}
            />
          </Grid>
          <Grid item xs={12} sm={5} style={{ padding: "24px 36px" }}>
            <PaymentItemDetails itemDetails={props.itemDetails} />
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}

export default BuyNowButton;
