import React, { useState, useEffect, useContext } from "react";
import IsLoggedinContext from "../utils/IsLoggedinContext";
import SwipeableImages from "../components/SwipeableImages.js";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import MakeOffer from "@material-ui/icons/HowToVote";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "max-content",
  },
  button: {
    width: "150px",
  },
});
function ViewItem(props) {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const status = useContext(IsLoggedinContext);

  function handleLikeBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!isLiked) {
      console.log(`liked this post`);
      return setIsLiked(true);
    }

    if (isLiked) {
      console.log(`liked this post`);
      return setIsLiked(false);
    }
  }

  function handleWatchlistBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!isBookmarked) {
      console.log(`added to watchlist`);
      return setIsBookmarked(true);
    }

    if (isBookmarked) {
      console.log(`remove from watchlist`);
      return setIsBookmarked(false);
    }
  }

  useEffect(() => {
    if (status.isLoggedin) {
      // make fetch to see what users have liked or have bookmarked;
      return;
    }
  }, [status.isLoggedin]);
  return (
    <>
      <Card className={classes.root}>
        <IconButton onClick={props.handleClick} style={{ float: "right" }}>
          <CloseIcon color="secondary" />
        </IconButton>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={5}>
            <SwipeableImages
              images={props.itemDetails.images}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              handleLikeBtn={handleLikeBtn}
              handleWatchlistBtn={handleWatchlistBtn}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <CardContent style={{ paddingTop: 0, marginLeft: "16px" }}>
              <Typography variant="h5" component="h2">
                {props.itemDetails.title}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                component="p"
                style={{ paddingBottom: "8px" }}
              >
                {`Price: $ ${props.itemDetails.price}`}
              </Typography>
              <Divider variant="middle" style={{ margin: 0 }} />
              <Grid container style={{ padding: "16px 0" }}>
                <Grid item xs={12} sm={6} align="center">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#348feb",
                      color: "white",
                      margin: "8px 0",
                    }}
                    className={classes.button}
                    startIcon={<MakeOffer />}
                  >
                    Make Offer
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<CreditCardIcon />}
                    style={{
                      margin: "8px 0",
                    }}
                  >
                    Buy Now
                  </Button>
                </Grid>
              </Grid>
              <Divider variant="middle" style={{ margin: 0 }} />
              <Typography
                style={{ paddingTop: "8px" }}
              >{`Condition: ${props.itemDetails.condition}`}</Typography>
              <br></br>
              <Typography variant="body1" component="div">
                Description:
              </Typography>
              <Typography>{props.itemDetails.description}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default ViewItem;
