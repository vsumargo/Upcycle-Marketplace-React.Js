import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import ItemCard from "../components/cards/itemCard.js";
// import ViewItem from "../pages/ViewItem.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function SearchItem() {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  const location = useLocation();
  const [searchedItems, setSearchedItems] = useState([]);
  const [openNotLoggedin, setOpenNotLoggedin] = React.useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    fetch(`/api/search?item=${query.get("item")}`)
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        }

        return res.json();
      })
      .then((result) => {
        console.log(result);
        setSearchedItems(result);
      })
      .catch((err) => console.log(err));
  }, [location.search, location.pathname]);
  // ---------------------------------------------------------
  // const handleOpenSnackbar = () => {
  //   setOpenNotLoggedin(true);
  // };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotLoggedin(false);
  };
  const query = new URLSearchParams(location.search);

  return (
    <div style={{ paddingBottom: "48px" }}>
      <ThemeProvider theme={theme}>
        <Typography variant="h4" gutterBottom style={{ padding: "16px 16px" }}>
          Searching for: {query.get("item")}
        </Typography>
      </ThemeProvider>
      <Grid container spacing={3} alignItems="flex-start" justify="flex-start">
        {searchedItems.map((details, index) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={details._id}>
              <Link
                to={`/item/${details._id}`}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <ItemCard
                  index={index}
                  details={details}
                  setOpen={setOpenNotLoggedin}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openNotLoggedin}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message="Login to like item or save to watchlist"
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
    </div>
  );
}

export default SearchItem;
