import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import IsLoggedinContext from "../utils/IsLoggedinContext";
import SwipeableImages from "../components/SwipeableImages.js";
import useCheckLiked from "../utils/useCheckLiked.js";
import useCheckWatchlisted from "../utils/useCheckWatchlisted.js";
import MakeOfferButton from "../components/MakeOfferButton.js";
import BuyNowButton from "../components/BuyNowButton.js";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Snackbar from "@material-ui/core/Snackbar";

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "max-content",
  },
  button: {
    width: "200px",
  },
});
function ViewItem() {
  const classes = useStyles();
  const { userStat } = useContext(IsLoggedinContext);
  const [itemDetails, setItemDetails] = useState({ images: [], likedBy: [] });
  const [sold, setSold] = useState("true");
  useEffect(() => {
    fetch(`/api/item/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        }

        return res.json();
      })
      .then((result) => {
        console.log(result);
        setItemDetails(result);
        setSold(result.sold.toString());
      })
      .catch((err) => console.log(err));
  }, [id]);
  const [isLiked, setIsLiked] = useCheckLiked(itemDetails.likedBy);
  const [isBookmarked, setIsBookmarked] = useCheckWatchlisted(itemDetails._id);
  const history = useHistory();
  let { id } = useParams();
  // console.log(id);
  const [openNotLoggedin, setOpenNotLoggedin] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotLoggedin(false);
  };

  function handleLikeBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!userStat.isLoggedin) {
      setOpenNotLoggedin(true);
      return console.log(`You need to Login to like posts`);
    }

    if (!isLiked) {
      console.log(`liked post ID: ${itemDetails._id} `);
      return fetch("/api/post/like", {
        method: "PUT",
        body: JSON.stringify({ id: itemDetails._id }),
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
          setIsLiked(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (isLiked) {
      console.log(`remove like from post ID: ${itemDetails._id}`);
      return fetch("/api/post/unlike", {
        method: "PUT",
        body: JSON.stringify({ id: itemDetails._id }),
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
          setIsLiked(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleWatchlistBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!userStat.isLoggedin) {
      setOpenNotLoggedin(true);
      return console.log(`You need to Login to add to watchlist`);
    }
    if (!isBookmarked) {
      console.log(`added to watchlist item ID: ${itemDetails._id}`);
      return fetch("/api/add/watchlist", {
        method: "PUT",
        body: JSON.stringify({ id: itemDetails._id }),
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
          setIsBookmarked(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (isBookmarked) {
      console.log(`remove from watchlist item ID: ${itemDetails._id}`);
      return fetch("/api/remove/watchlist", {
        method: "PUT",
        body: JSON.stringify({ id: itemDetails._id }),
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
          setIsBookmarked(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleCloseBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    if (history.length === 1) {
      return window.close();
    }
    history.goBack();
  }

  function setSoldState(bool) {
    setSold(bool);
  }
  return (
    <Grid
      container
      alignItems="flex-start"
      justify="flex-start"
      style={{ marginTop: "16px" }}
    >
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <SwipeableImages
              images={itemDetails.images}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              handleLikeBtn={handleLikeBtn}
              handleWatchlistBtn={handleWatchlistBtn}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <CardContent style={{ marginLeft: "16px" }}>
              <IconButton onClick={handleCloseBtn} style={{ float: "right" }}>
                <CloseIcon color="secondary" />
              </IconButton>
              <ThemeProvider theme={theme}>
                <Typography variant="h5">{itemDetails.title}</Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  component="p"
                  style={{ paddingBottom: "8px" }}
                >
                  {sold === "true" ? `SOLD` : `Price: $ ${itemDetails.price}`}
                </Typography>
              </ThemeProvider>
              <Divider variant="middle" style={{ margin: 0 }} />
              <Grid container style={{ padding: "16px 0" }}>
                <Grid item xs={12} md={6} align="center">
                  <MakeOfferButton
                    className={classes.button}
                    itemId={itemDetails._id}
                    sellerId={itemDetails.userId}
                    sold={sold}
                    setOpen={setOpenNotLoggedin}
                  />
                </Grid>

                <Grid item xs={12} md={6} align="center">
                  <BuyNowButton
                    className={classes.button}
                    itemId={itemDetails._id}
                    sellerId={itemDetails.userId}
                    itemDetails={itemDetails}
                    sold={sold}
                    setSoldState={setSoldState}
                    setOpen={setOpenNotLoggedin}
                  />
                </Grid>
              </Grid>
              <Divider variant="middle" style={{ margin: 0 }} />
              <ThemeProvider theme={theme}>
                <Typography
                  variant="body2"
                  style={{ paddingTop: "8px" }}
                >{`Condition: ${itemDetails.condition}`}</Typography>
                <br></br>
                <Typography
                  variant="body1"
                  style={{ textDecoration: "underline" }}
                >
                  Description:
                </Typography>
                <Typography variant="caption">
                  {itemDetails.description}
                </Typography>
              </ThemeProvider>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openNotLoggedin}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message="User need to Login"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="secondary"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Grid>
  );
}

export default ViewItem;
