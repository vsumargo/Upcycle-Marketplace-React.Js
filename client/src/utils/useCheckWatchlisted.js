import { useState, useEffect, useContext } from "react";
import IsLoggedinContext from "./IsLoggedinContext.js";

function useCheckWatchlisted(itemId) {
  const {
    userStat: { isLoggedin },
  } = useContext(IsLoggedinContext);
  const [isBookmarked, setIsBookmarked] = useState(() => false);

  useEffect(() => {
    if (isLoggedin) {
      fetch("/api/watchlist")
        .then((res) => {
          if (res.status !== 200) {
            throw res;
          }

          return res.json();
        })
        .then((result) => {
          const watchlistedItemId = result.watchList.map((item) => item._id);
          const index = watchlistedItemId.indexOf(itemId);
          if (index > -1) {
            setIsBookmarked((prevState) => !prevState);
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsBookmarked(false);
    }
  }, [isLoggedin, itemId]);

  return [isBookmarked, setIsBookmarked];
}

export default useCheckWatchlisted;
