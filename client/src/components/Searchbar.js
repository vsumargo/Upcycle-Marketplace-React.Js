import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  search: {
    display: "flex",
  },
  searchIcon: {
    position: "absolute",
    left: "100px",
  },
}));

function Searchbar() {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      {/* <Button className={classes.searchIcon} type="submit">
        <SearchIcon />
      </Button> */}

      <TextField
        style={{ width: "inherit", zIndex: 0 }}
        id="iten"
        name="item"
        label="Search Item"
        type="text"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
}

export default Searchbar;
