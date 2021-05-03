import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    height: "100%",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "100%",
    display: "block",
    overflow: "hidden",
    width: "100%",
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingTop: 0,
  },
}));

function SwipeableImages(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.images.map((step, index) => (
          <div key={index} align="center">
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.location} />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        style={{ backgroundColor: "#fff" }}
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      <CardActions disableSpacing className={classes.cardActions}>
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
      </CardActions>
    </div>
  );
}

export default SwipeableImages;
