import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IsLoggedinContext from "./utils/IsLoggedinContext.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import "./App.css";

import Nav from "./components/Nav";
import Home from "./pages/Home.js";
import PostItem from "./pages/PostItem.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import SearchItem from "./pages/SearchItem.js";
import ViewItem from "./pages/ViewItem.js";
import Watchlist from "./pages/Watchlist.js";
// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {
  const [userStat, setUserStat] = useState(() => ({
    isLoggedin: false,
    userId: null,
  }));
  console.log(userStat);

  useEffect(() => {
    fetch("/api/userstatus")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.isLoggedin) {
          return;
        }
        setUserStat(data);
        // setIsLoggedin(true);
        // setUserId(userStatus.userId);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <CssBaseline />
      <IsLoggedinContext.Provider value={{ userStat, setUserStat }}>
        <BrowserRouter>
          <Nav />
            <Container>
              <Switch>
                <Route exact path="/post-item">
                  <PostItem />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/watchlist">
                  <Watchlist />
                </Route>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/item/:id">
                  <ViewItem />
                </Route>
                <Route path="/search">
                  <SearchItem />
                </Route>
              </Switch>
            </Container>
        </BrowserRouter>
      </IsLoggedinContext.Provider>
    </>
  );
}

export default App;
