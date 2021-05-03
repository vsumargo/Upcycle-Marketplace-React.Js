import React, { useState, useEffect, useContext } from "react";
import IsLoggedinContext from "../../utils/IsLoggedinContext";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";

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
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const status = useContext(IsLoggedinContext);

  useEffect(() => {
    if (status.isLoggedin) {
      // make fetch to see what users have liked or have bookmarked;
      return;
    }
  }, [status.isLoggedin]);

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

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card
        className={classes.root}
        index={props.index}
        onClick={props.handleClick}
        style={{
          cursor: "pointer",
        }}
      >
        <CardMedia
          className={classes.media}
          image={props.details.images[0].location}
        />
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="like post" onClick={handleLikeBtn}>
            {!isLiked ? (
              <FavoriteBorderIcon />
            ) : (
              <FavoriteIcon color="secondary" />
            )}
          </IconButton>
          <IconButton
            aria-label="add to watchlist"
            onClick={handleWatchlistBtn}
          >
            {!isBookmarked ? (
              <BookmarkBorderSharpIcon />
            ) : (
              <BookmarkSharpIcon color="primary" />
            )}
          </IconButton>
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
    </Grid>
  );
}

export default ItemCard;
