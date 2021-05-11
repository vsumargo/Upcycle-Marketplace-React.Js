import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Searchbar from "../components/Searchbar.js";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "70vw",
    },
  },
}));

function Home() {
  const [item, setItem] = useState("");
  const classes = useStyles();
  let history = useHistory();

  function handleChange(event) {
    event.preventDefault();
    setItem(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    history.push(`/search?item=${item}`);
  }

  return (
    <Grid
      container
      spacing={0}
      style={{ height: "89vh" }}
      alignItems="center"
      justify="center"
    >
      <Grid item xs={10}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onChange={handleChange}
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Searchbar searchedItem={item} />
        </form>
      </Grid>
    </Grid>
  );
}
export default Home;
