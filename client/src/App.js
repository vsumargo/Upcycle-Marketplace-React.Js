import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import IsLoggedinContext from './utils/IsLoggedinContext.js'

import Nav from "./components/Nav";
import Home from "./pages/Home.js";
import PostItem from "./pages/PostItem.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import SearchItem from "./pages/SearchItem.js";

// The app will not render correctly until you setup a Route component.
// Refer to the Basic Example documentation if you need to.
// (https://reacttraining.com/react-router/web/example/basic)
function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  

  return (
    <>
      <IsLoggedinContext.Provider value={{ isLoggedin, setIsLoggedin }}>
        <BrowserRouter>
          <Nav />
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
            <Route exact path="/search">
              <SearchItem />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </IsLoggedinContext.Provider>
    </>
  );
}

export default App;
