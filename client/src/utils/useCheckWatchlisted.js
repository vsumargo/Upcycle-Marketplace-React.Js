import { useState, useEffect, useContext } from "react";
import IsLoggedinContext from "./IsLoggedinContext.js";

function useCheckWatchlisted(itemId) {
  const {
    userStat: { isLoggedin, userId },
  } = useContext(IsLoggedinContext);
  const [isBookmarked, setIsBookmarked] = useState(() => false);

  useEffect(() => {
    if (isLoggedin && !isBookmarked) {
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
            return setIsBookmarked((prevState) => !prevState);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isBookmarked, isLoggedin, itemId, userId]);

  return [isBookmarked, setIsBookmarked];
}

export default useCheckWatchlisted;
