import React, { useContext } from "react";
import { Link } from "react-router-dom";
import IsLoggedinContext from "../../utils/IsLoggedinContext";

function Nav() {
  const status = useContext(IsLoggedinContext);

  function handleLogout (event) {
    event.preventDefault();
    fetch('/api/logout/')
    .then(() => {
      window.location = '/'
    })
  }

  return (
    <div>
      <Link to="/">
        <span>LOGO</span>
      </Link>
      <Link to="/post-item">
        <button>Post Item</button>
      </Link>
      {status.isLoggedin ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Nav;
