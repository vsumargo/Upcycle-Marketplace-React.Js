import React, { useContext } from "react";
import IsLoggedinContext from "../../utils/IsLoggedinContext";
import IconBar from "../IconBar.js";
import useCheckLiked from "../../utils/useCheckLiked.js";
import useCheckWatchlisted from "../../utils/useCheckWatchlisted.js";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingTop: 0,
  },
});

function ItemCard(props) {
  const classes = useStyles();
  const { userStat } = useContext(IsLoggedinContext);
  const [isLiked, setIsLiked] = useCheckLiked(props.details.likedBy);

  const [isBookmarked, setIsBookmarked] = useCheckWatchlisted(
    props.details._id
  );

  function handleLikeBtn(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!userStat.isLoggedin) {
      return console.log(`You need to Login to like posts`);
    }

    if (!isLiked) {
      console.log(`liked post ID: ${props.details._id} `);
      return fetch("/api/post/like", {
        method: "PUT",
        body: JSON.stringify({ id: props.details._id }),
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
      console.log(`remove like from post ID: ${props.details._id}`);
      return fetch("/api/post/unlike", {
        method: "PUT",
        body: JSON.stringify({ id: props.details._id }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp);
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
      return console.log(`You need to Login to add to watchlist`);
    }
    if (!isBookmarked) {
      console.log(`added to watchlist item ID: ${props.details._id}`);
      return fetch("/api/add/watchlist", {
        method: "PUT",
        body: JSON.stringify({ id: props.details._id }),
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
      console.log(`remove from watchlist item ID: ${props.details._id}`);
      return fetch("/api/remove/watchlist", {
        method: "PUT",
        body: JSON.stringify({ id: props.details._id }),
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

  return (
    <Card
      className={classes.root}
      index={props.index}
      // onClick={props.handleClick}
      style={{
        cursor: "pointer",
      }}
    >
      <CardMedia
        className={classes.media}
        image={props.details.images[0].location}
      />
      <CardActions disableSpacing className={classes.cardActions}>
        <IconBar
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          handleLikeBtn={handleLikeBtn}
          handleWatchlistBtn={handleWatchlistBtn}
        />
      </CardActions>
      <CardContent style={{ paddingBottom: "8px", paddingTop: 0 }}>
        <Typography noWrap variant="h6" component="h2">
          {props.details.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {`$ ${props.details.price}`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ItemCard;
