import { useState, useEffect, useContext } from "react";
// import { useLocation } from "react-router-dom";
import IsLoggedinContext from "../../utils/IsLoggedinContext.js";
import MessageIconPopover from "./MessageIconPopover.js";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

function MessageIcon() {
  const [anchorEl, setAnchorEl] = useState(null);
  // const location = useLocation();
  const { userStat } = useContext(IsLoggedinContext);
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState(0);

  useEffect(() => {
    if (userStat.isLoggedin === true && userStat.userId !== null) {
      // console.log(`making API call to get notifications`);
      fetch("/api/notification")
        .then((res) => {
          if (res.status !== 200) {
            throw res;
          }

          return res.json();
        })
        .then((result) => {
          console.log(`Showing notifications API call result`);
          console.log(result);
          const numberOfNotifications = result.filter((ntf) => {
            if (ntf.viewed === false) {
              return true;
            }
            return false;
          }).length;

          setNewNotifications(numberOfNotifications);
          setNotifications(result);
        })
        .catch((err) => console.log(err));
    } else {
      // console.log(`NOT making API call for notifications`);
    }
  }, [userStat.isLoggedin, userStat.userId]);

  // const numberOfNotifications = notifications.filter((ntf) => {
  //   if (ntf.viewed === false) {
  //     return true;
  //   }
  //   return false;
  // });

  // console.log(numberOfNotifications);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNewNotifications((prevState) => {
      if (prevState === 0) {
        return;
      }
      return 0;
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <IconButton
        aria-label={`show ${newNotifications} new notifications`}
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={newNotifications} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <MessageIconPopover
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        id={id}
        notifications={notifications}
      />
    </div>
  );
}

export default MessageIcon;
