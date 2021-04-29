import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    left: "65vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
}));

function Searchbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <Link
        to={props.searchedItem && "/search?item=" + props.searchedItem}
        style={{ color: "black", textDecoration: "none" }}
      >
        <Button className={classes.searchIcon}>
          <SearchIcon />
        </Button>
      </Link>

      <TextField
        style={{ width: "inherit", zIndex: 0 }}
        id="iten"
        name="item"
        label="Search Item"
        type="text"
        variant="outlined"
      />
    </div>
  );
}

export default Searchbar;
