import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";

function IconBar(props) {
  return (
    <>
      <IconButton aria-label="like post" onClick={props.handleLikeBtn}>
        {!props.isLiked ? (
          <FavoriteBorderIcon />
        ) : (
          <FavoriteIcon color="secondary" />
        )}
      </IconButton>
      <IconButton
        aria-label="add to watchlist"
        onClick={props.handleWatchlistBtn}
      >
        {!props.isBookmarked ? (
          <BookmarkBorderSharpIcon />
        ) : (
          <BookmarkSharpIcon color="primary" />
        )}
      </IconButton>
    </>
  );
}

export default IconBar;
