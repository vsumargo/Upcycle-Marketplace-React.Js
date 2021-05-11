import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function MessageList({ details }) {
  const [isViewed, setIsViewed] = useState(true);
  const [replyStatus, setReplyStatus] = useState(null);

  useEffect(() => {
    setIsViewed(details.viewed);
    setReplyStatus(details.replyStatus);
  }, [details.replyStatus, details.viewed]);

  function displayMessage(mssg, replyStatus) {
    let messageToDisplay;
    switch (mssg) {
      case "submit offer":
        messageToDisplay = (
          <span
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{ fontSize: "12px" }}
            >{`Received an offer for $${details.offerPrice}`}</span>
            <span>
              {replyStatus === "accept" ? (
                <Button
                  variant="outlined"
                  style={{ padding: 0, fontSize: "10px", margin: "0 3px" }}
                  disabled
                >
                  Accepted
                </Button>
              ) : replyStatus === "decline" ? (
                <Button
                  variant="outlined"
                  style={{ padding: 0, fontSize: "10px", margin: "0 3px" }}
                  disabled
                >
                  Declined
                </Button>
              ) : (
                <>
                  <Button
                    id={details._id}
                    variant="outlined"
                    color="primary"
                    style={{ padding: 0, fontSize: "10px", margin: "0 3px" }}
                    onClick={handleAcceptBtn}
                  >
                    Accept
                  </Button>
                  <Button
                    id={details._id}
                    variant="outlined"
                    color="secondary"
                    style={{ padding: 0, fontSize: "10px", margin: "0 3px" }}
                    onClick={handleDeclineBtn}
                  >
                    Decline
                  </Button>
                </>
              )}
            </span>
          </span>
        );
        break;
      case "accept offer":
        messageToDisplay = (
          <span
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{ fontSize: "12px", width: "90%" }}
            >{`Your offer of $${details.offerPrice} has been accepted. Please make payment`}</span>
            <span>
              <Link
                to={`/item/${details.postId._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ padding: 0, fontSize: "10px", margin: "0 3px" }}
                >
                  Pay Now
                </Button>
              </Link>
            </span>
          </span>
        );
        break;
      case "decline offer":
        messageToDisplay = (
          <span style={{ fontSize: "12px", width: "90%" }}>
            {`Your offer of $${details.offerPrice} was declined. Please make new offer`}
          </span>
        );
        break;
      default:
        messageToDisplay = <div>Error: Unknown Message</div>;
        break;
    }
    return messageToDisplay;
  }

  function handleMouseEnter(event) {
    if (isViewed) {
      return;
    }

    const notificationId = event.currentTarget.getAttribute("id");
    fetch("/api/notification", {
      method: "PUT",
      body: JSON.stringify({ id: notificationId }),
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
      .then(() => {
        // console.log(result);
        setIsViewed(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAcceptBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    const notificationId = event.currentTarget.getAttribute("id");
    const newNotificationData = {
      offerPrice: details.offerPrice,
      sellerId: details.sellerId,
      buyerId: details.buyerId,
      postId: details.postId._id,
      message: "accept offer",
      acceptOffer: true,
    };
    fetch("/api/acceptoffer", {
      method: "POST",
      body: JSON.stringify({ notificationId, newNotificationData }),
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
      .then(() => {
        // console.log(result);
        setReplyStatus("accept");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeclineBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    const notificationId = event.currentTarget.getAttribute("id");
    const newNotificationData = {
      offerPrice: details.offerPrice,
      sellerId: details.sellerId,
      buyerId: details.buyerId,
      postId: details.postId._id,
      message: "decline offer",
      acceptOffer: false,
    };
    fetch("/api/declineoffer", {
      method: "POST",
      body: JSON.stringify({ notificationId, newNotificationData }),
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
      .then(() => {
        // console.log(result);
        setReplyStatus("decline");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const isViewedStyle = !isViewed
    ? { borderLeft: "7px solid rgba(220,20,60,0.7)", paddingRight: "8px" }
    : { paddingRight: "8px" };

  return (
    <>
      <ListItem
        alignItems="flex-start"
        style={isViewedStyle}
        id={details._id}
        onMouseEnter={handleMouseEnter}
      >
        <ListItemAvatar>
          <Avatar
            style={{
              boxShadow: "0 0 3px grey",
              width: "50px",
              height: "50px",
            }}
            variant="rounded"
            alt="Remy Sharp"
            src={details.postId.images[0].location}
          />
        </ListItemAvatar>
        <ListItemText
          primary={details.postId.title}
          secondary={<>{displayMessage(details.message, replyStatus)}</>}
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
}

export default MessageList;
