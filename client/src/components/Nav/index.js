import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import IsLoggedinContext from "../../utils/IsLoggedinContext";
import MessageIcon from "./MessageIcon.js";

import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  inputRoot: {
    color: "default",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const CssIconButton = withStyles({
  root: {
    "&.MuiButtonBase-root": {
      padding: "6px",
      "&.MuiIconButton-root:hover": {
        backgroundColor: "rgba(10,10,10,0.1)",
      },
    },
  },
})(IconButton);

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const { userStat, setUserStat } = useContext(IsLoggedinContext);
  const [login, setLogin] = useState(null);

  let location = useLocation();
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [item, setItem] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/post-item"
    ) {
      displaySearchBar !== false && setDisplaySearchBar(false);
    } else {
      setDisplaySearchBar(true);
    }
  }, [displaySearchBar, location.pathname]);

  useEffect(() => {
    setLogin(userStat.isLoggedin);
  }, [userStat.isLoggedin]);

  function handleLogout(event) {
    event.preventDefault();
    setAnchorEl(null);
    handleMobileMenuClose();
    fetch("/api/logout/").then(() => {
      setUserStat((prevState) => ({ ...prevState, isLoggedin: false }));
      document.location.reload();
    });
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/watchlist">Watchlist</Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {login === null ? (
        ""
      ) : login ? (
        <MenuList>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/post-item"
              style={{ color: "none", textDecoration: "none" }}
            >
              Sell Item
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="default"
              style={{ padding: 0 }}
            >
              <AccountCircle />
            </IconButton>
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/signup"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              SIGN UP
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link
              to="/login"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              LOGIN
            </Link>
          </MenuItem>
        </MenuList>
      )}
      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="default"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        style={{ backgroundColor: "white" }}
        color="default"
        position="static"
      >
        <Toolbar>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              UPCYCLE
            </Typography>
          </Link>
          <div className={classes.search}>
            {displaySearchBar && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  history.push(`/search?item=${item}`);
                }}
              >
                <CssIconButton type="submit">
                  <SearchIcon />
                </CssIconButton>
                <InputBase
                  placeholder="Search…"
                  onChange={(event) => {
                    event.preventDefault();
                    setItem(event.target.value);
                  }}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </form>
            )}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {login === null ? (
              ""
            ) : login ? (
              <>
                <Link
                  to="/post-item"
                  style={{
                    color: "none",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    margin: "0 8px",
                  }}
                >
                  <Button size="small" variant="contained" color="primary">
                    Sell Item
                  </Button>
                </Link>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0 8px",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
                <MessageIcon />
                <Button
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="default"
                >
                  <AccountCircle />
                  <ArrowDropDownIcon />
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  style={{ color: "none", textDecoration: "none" }}
                >
                  <Button color="default">Sign Up</Button>
                </Link>
                <Link
                  to="/login"
                  style={{ color: "none", textDecoration: "none" }}
                >
                  <Button color="default">Login</Button>
                </Link>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <MessageIcon />
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="default"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

// function Nav() {
//   const status = useContext(IsLoggedinContext);

//   function handleLogout(event) {
//     event.preventDefault();
//     fetch("/api/logout/").then(() => {
//       window.location = "/";
//     });
//   }

//   return (
//     <div>
//       <Link to="/">
//         <span>LOGO</span>
//       </Link>
//       <Link to="/post-item">
//         <button>Post Item</button>
//       </Link>
//       {status.isLoggedin ? (
//         <button onClick={handleLogout}>Logout</button>
//       ) : (
//         <>
//           <Link to="/login">
//             <button>Login</button>
//           </Link>
//           <Link to="/signup">
//             <button>Sign Up</button>
//           </Link>
//         </>
//       )}
//     </div>
//   );
// }

// export default Nav;
