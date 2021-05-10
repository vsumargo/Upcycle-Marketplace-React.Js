import Popover from "@material-ui/core/Popover";
import MessageList from "./MessageList.js";
import List from "@material-ui/core/List";

function MessageIconPopover({
  anchorEl,
  handleClose,
  id,
  open,
  notifications,
}) {
  function handleNotifications(data) {
    return data.map((ntfDetails) => {
      return <MessageList key={ntfDetails._id} details={ntfDetails} />;
    });
  }

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <List style={{ width: "380px", maxHeight: "350px", overflow: "auto", padding:0}}>
        {handleNotifications(notifications)}
      </List>
    </Popover>
  );
}

export default MessageIconPopover;
