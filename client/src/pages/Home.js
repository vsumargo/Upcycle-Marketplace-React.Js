import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [item, setItem] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setItem(event.target.value);
  };

  return (
    <div>
      <h1>Hello World</h1>
      <form onChange={handleChange}>
        <label htmlFor="item">Search Item:</label>
        <input
          type="text"
          id="item"
          name="item"
          placeholder="Enter item you want to search"
        />
        <Link to={item && ('/search?item='+item)}>
          <button> Submit</button>
        </Link>
      </form>
    </div>
  );
}
export default Home;
