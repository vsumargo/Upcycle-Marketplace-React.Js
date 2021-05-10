import React, { useState, useContext, useEffect } from "react";
import IsLoggedinContext from "../utils/IsLoggedinContext";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MakeOfferIcon from "@material-ui/icons/HowToVote";
import InputAdornment from "@material-ui/core/InputAdornment";

function MakeOfferButton(props) {
  const [open, setOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const { userStat } = useContext(IsLoggedinContext);
  const [currentUser, setCurrentUser] = useState(true);
  useEffect(() => {
    setCurrentUser(userStat.userId);
  }, [userStat.userId]);

  const handleClickOpen = () => {
    if (userStat.isLoggedin === true && currentUser !== props.sellerId) {
      return setOpen(true);
    }
    console.log(`You need to login to make an offer`);
  };

  const handleClose = () => {
    if (userStat.isLoggedin === true) {
      return setOpen(false);
    }
  };

  function handleInputOffer(event) {
    event.preventDefault();
    const onlyNums = event.target.value.replace(/[^0-9]/g, "");
    setOfferPrice(onlyNums);
  }
  function handleMakeOfferBtn(event) {
    event.preventDefault();
    if (userStat.isLoggedin === true && currentUser !== props.sellerId) {
      console.log(`sending offer`);
      const notificationData = {
        offerPrice,
        postId: props.itemId,
        sellerId: props.sellerId,
        message: "submit offer",
      };
      return fetch("/api/makeoffer", {
        method: "POST",
        body: JSON.stringify(notificationData),
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
        .then((data) => console.log(data))
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(`you are unable to make an offer for this item`);
  }

  return (
    <>
      {currentUser === props.sellerId || props.sold === 'true' ? (
        <Button
          variant="contained"
          style={{
            color: "white",
            margin: "8px 0",
          }}
          className={props.className}
          onClick={handleClickOpen}
          startIcon={<MakeOfferIcon />}
          disabled
        >
          Make Offer{" "}
        </Button>
      ) : (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#348feb",
            color: "white",
            margin: "8px 0",
          }}
          className={props.className}
          onClick={handleClickOpen}
          startIcon={<MakeOfferIcon />}
        >
          {" "}
          Make Offer{" "}
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        // maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Make Offer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the amount you want to offer for this item:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="offerPrice"
            id="offerPrice"
            label="Offer Price"
            type="text"
            onChange={handleInputOffer}
            value={offerPrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleMakeOfferBtn}
            style={{
              backgroundColor: "#348feb",
              color: "white",
            }}
            ariant="contained"
            color="primary"
          >
            Make Offer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MakeOfferButton;
