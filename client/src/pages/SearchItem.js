import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "../components/cards/itemCard.js";
import ViewItem from "../pages/ViewItem.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


function SearchItem() {
  const location = useLocation();
  const [searchedItems, setSearchedItems] = useState([]);

  const [viewItemDetails, setViewItemDetails] = useState(false);
  const [itemDetails, setItemDetails] = useState({});

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
        setSearchedItems(result);
      })
      .catch((err) => console.log(err));
  }, [location.search]);
  // ---------------------------------------------------------

  const query = new URLSearchParams(location.search);

  function handleClickItemCard(event) {
    event.preventDefault();
    console.log(event.currentTarget.getAttribute("index"));
    const index = event.currentTarget.getAttribute("index");
    const item = searchedItems[index];
    console.log(item);
    setItemDetails(item);
    setViewItemDetails(true);
  }

  function handleClickBackBtn(event) {
    event.preventDefault();
    setItemDetails({});
    setViewItemDetails(false);
  }

  

  return (
    <div>
      <Typography variant="h4" gutterBottom>Searching for: {query.get("item")}</Typography>
      <Grid
        container
        spacing={1}
        alignItems="flex-start"
        justify="flex-start"
      >
        {viewItemDetails === false &&
          searchedItems.map((details, index) => {
            return (
              <ItemCard
                handleClick={handleClickItemCard}
                key={index}
                index={index}
                details={details}
              />
            );
          })}
        {viewItemDetails === true && (
          <ViewItem
            handleClick={handleClickBackBtn}
            itemDetails={itemDetails}
          />
        )}
      </Grid>
    </div>
  );
}

export default SearchItem;
