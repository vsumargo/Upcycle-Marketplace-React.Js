import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ItemCard from "../components/cards/itemCard.js";
// import ViewItem from "../pages/ViewItem.js";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function SearchItem() {
  const location = useLocation();
  const [searchedItems, setSearchedItems] = useState([]);
  // const history = useHistory();

  // const [viewItemDetails, setViewItemDetails] = useState(false);
  // const [itemDetails, setItemDetails] = useState({});

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
  }, [location.search, location.pathname]);
  // ---------------------------------------------------------

  const query = new URLSearchParams(location.search);

  // function handleClickItemCard(event) {
  //   event.preventDefault();
  //   // console.log(event.currentTarget.getAttribute("index"));
  //   const index = event.currentTarget.getAttribute("index");
  //   const item = searchedItems[index];
  //   // console.log(item._id);
  //   // console.log(typeof item._id);
  //   // history.push(`/item/${item._id}`);

  //   // setItemDetails(item);
  //   // setViewItemDetails(true);
  // }

  // // function handleClickBackBtn(event) {
  // //   event.preventDefault();
  // //   setItemDetails({});
  // //   setViewItemDetails(false);
  // // }

  return (
    <div style={{paddingBottom:"48px"}}>
      <Typography variant="h4" gutterBottom style={{padding:"16px 16px"}}>
        Searching for: {query.get("item")}
      </Typography>
      <Grid container spacing={3} alignItems="flex-start" justify="flex-start">
        {searchedItems.map((details, index) => {
          return (
            <Grid item xs={6} sm={4} md={3} key={details._id}>
              <Link
                to={`/item/${details._id}`}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <ItemCard
                  // handleClick={handleClickItemCard}

                  index={index}
                  details={details}
                />
              </Link>
            </Grid>
          );
        })}
        {/* {viewItemDetails === true && (
          <ViewItem
            handleClick={handleClickBackBtn}
            itemDetails={itemDetails}
          />
        )} */}
      </Grid>
    </div>
  );
}

export default SearchItem;
