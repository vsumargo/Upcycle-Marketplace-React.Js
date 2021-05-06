import { useState, useEffect, useContext } from "react";
import IsLoggedinContext from "./IsLoggedinContext.js";

function useCheckLiked(likedBy) {
  const {
    userStat: { isLoggedin, userId },
  } = useContext(IsLoggedinContext);
  const [isLiked, setIsLiked] = useState(() => false);

  useEffect(() => {
    if (isLoggedin) {
      const index = likedBy.indexOf(userId);
      if (index > -1) {
        setIsLiked((prevState) => !prevState);
      }
    } else {
      setIsLiked(false);
    }
  }, [isLoggedin, likedBy, userId]);

  return [isLiked, setIsLiked];
}

export default useCheckLiked;
