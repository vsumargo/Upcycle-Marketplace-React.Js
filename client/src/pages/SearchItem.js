import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchItem() {
  const location = useLocation();
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    fetch(`/search?item=${query.get("item")}`)
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        }

        return res.json();
      })
      .then((result) => {
        console.log(result);
        setDisplay([result]);
      })
      .catch((err) => console.log(err));
  }, [location.search]);
  // ---------------------------------------------------------

  const query = new URLSearchParams(location.search);

  return (
    <div>
      <h1>Searching for: {query.get("item")}</h1>
      {display.map((item, index) => {
        return <div key={index}> {item.item} </div>;
      })}
    </div>
  );
}

export default SearchItem;
