import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IsLoggedinContext from "../utils/IsLoggedinContext.js";
import ItemCard from "../components/cards/itemCard.js";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Watchlist() {
  const { userStat } = useContext(IsLoggedinContext);
  const [watchlistedItems, setWatchlistedItems] = useState([]);

  useEffect(() => {
    if (userStat.isLoggedin) {
      fetch("/api/watchlist")
        .then((res) => {
          if (res.status !== 200) {
            throw res;
          }

          return res.json();
        })
        .then((result) => {
          console.log(result);
          setWatchlistedItems(result.watchList);
        })
        .catch((err) => console.log(err));
    }
  }, [userStat.isLoggedin]);

  // function checkIfBookmarked(itemId) {
  //   const watchlistedItemId = watchlistedItems.map((item) => item._id);
  //   const index = watchlistedItemId.indexOf(itemId);
  //   if (index > -1) {
  //     return true;
  //   }

  //   if (index === -1) {
  //     return false;
  //   }
  // }

  return (
    <>
      {userStat.isLoggedin ? (
        watchlistedItems.length === 0 ? (
          <div>You have no watchlisted items</div>
        ) : (
          <div>
            <Typography variant="h4" gutterBottom>
              Watchlisted Items:
            </Typography>
            <Grid
              container
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              {watchlistedItems.map((details, index) => {
                return (
                  <Grid item xs={6} sm={4} md={3} key={details._id}>
                    <Link
                      to={`/item/${details._id}`}
                      style={{ width: "100%", textDecoration: "none" }}
                    >
                      <ItemCard
                        // handleClick={handleClickItemCard}
                        // isBookmarked={checkIfBookmarked(details._id)}
                        index={index}
                        details={details}
                      />
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )
      ) : (
        <div> You need to Login view the watchlisted items.</div>
      )}
    </>
  );
}

export default Watchlist;
