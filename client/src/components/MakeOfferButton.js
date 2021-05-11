import React, { useState, useContext, useEffect, useRef } from "react";
import IsLoggedinContext from "../utils/IsLoggedinContext";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MakeOfferIcon from "@material-ui/icons/HowToVote";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

function MakeOfferButton(props) {
  const [open, setOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const { userStat } = useContext(IsLoggedinContext);
  const [currentUser, setCurrentUser] = useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const history = useHistory();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    setCurrentUser(userStat.userId);
  }, [userStat.userId]);

  const handleClickOpen = () => {
    if (userStat.isLoggedin === true && currentUser !== props.sellerId) {
      return setOpen(true);
    }
    console.log(`You need to login to make an offer`);
    props.setOpen(true);
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
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = window.setTimeout(() => {
          setSuccess(true);
          setLoading(false);
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
            .then(() => history.go(0))
            .catch((error) => {
              console.log(error);
            });
        }, 2000);
      }
    }
    console.log(`you are unable to make an offer for this item`);
  }

  return (
    <>
      {currentUser === props.sellerId || props.sold === "true" ? (
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
        <DialogTitle id="form-dialog-title">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Make Offer{" "}
            <IconButton
              onClick={handleClose}
              style={{ float: "right", height: "100%", padding: 0 }}
            >
              <CloseIcon color="secondary" />
            </IconButton>
          </div>
        </DialogTitle>
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
          <div style={{ position: "relative" }}>
            <Button
              onClick={handleMakeOfferBtn}
              style={
                success
                  ? {
                      backgroundColor: "#47d147",
                    }
                  : loading
                  ? {
                      backgroundColor: "#dddddd",
                      color: "white",
                    }
                  : {
                      backgroundColor: "#348feb",
                      color: "white",
                    }
              }
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Make Offer
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                style={{
                  color: "green",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MakeOfferButton;
