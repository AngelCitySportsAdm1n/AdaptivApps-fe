import React, { useState } from "react";
import Announcements from "../Messages/Announcements";
import { useMutation } from "react-apollo";
import { DELETE_NOTIFICATION } from "../../queries/Notifications";

// Style Imports
import { withStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import Badge from "@material-ui/core/Badge";
import { makeStyles, Hidden } from "@material-ui/core";

const StyledBadge = withStyles(theme => ({
  badge: {
    left: -5,
    top: 10,
    width: "2%",
    backgroundColor: "#052942",
    color: "white",
    fontSize: "1.25rem",
  },
}))(Badge);

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    display: "flex",
    alignItems: 'center',
    whiteSpace: "nowrap",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {      
      margin: "5% 5% 5% 5.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "5% 5% 5% 5.5rem",
    },
  },
  chatRoomIcon: {
    color: "#2962FF",
    fontSize: "2.7rem",
  
    [theme.breakpoints.down("sm")]: {
      marginRight: "2%",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "2%",
    },
  },
  chatRoomButton: {
    fontSize: "1.6rem",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
    background: "none",
  },
  closeModal: {
    fontSize: "3rem",
    marginTop: "1%",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
  roomTitle: {
    fontSize: "2rem",
    color: "#2962FF",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1% 2% 0 2%",
    borderBottom: "1px solid grey",
  },
  modal: {
    position: "fixed",
    top: "20%",
    left: "20%",
    fontSize: "-webkit-xxx-large",
  },
  alertDiv: {
    width: "100%",
    margin: "0",
  },
}));

export default function AnnouncementRoom({
  user,
  announcements,
  notifications,
}) {
  const classes = useStyles();
  const [messageToggle, setMessageToggle] = useState(false);
  const [updateChat, setUpdateChat] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

  // Set timeout for automated alerts
  setTimeout(function() {
    if (updateChat) {
      setUpdateChat(false);
    } else if (deleteChat) {
      setDeleteChat(false);
    }
  }, 3000);

  const handleClick = e => {
    e.preventDefault();
    messageToggle ? setMessageToggle(false) : setMessageToggle(true);

    announcementNotifications.length > 0 &&
      announcementNotifications.map(notification => {
        deleteNotification({
          variables: {
            id: notification,
          },
        });
      });
  };

  const closeDrawer = e => {
    e.preventDefault();
    messageToggle ? setMessageToggle(false) : setMessageToggle(true);
  };

  const announcementNotifications = [];
  notifications &&
    notifications.map(
      notification =>
        notification.label !== null &&
        notification.label === "Announcement" &&
        announcementNotifications.push(notification.id)
    );

  return (
    <>
      <div className={classes.root}>
        <Tooltip title="Click to expand messages">
          <StyledBadge
            badgeContent={announcementNotifications.length}
            overlap="circle"
          >
            <BookmarksIcon className={classes.chatRoomIcon} />
            <button
              className={classes.chatRoomButton}
              onClick={handleClick}
              aria-label="Open all announcements"
            >
              Announcements
            </button>
          </StyledBadge>
        </Tooltip>
      </div>
      <Hidden only={["xs", "sm"]}>
        <Drawer
          anchor="right"
          open={messageToggle}
          onClose={handleClick}
          variant="temporary"
          PaperProps={{ style: { width: "66%" } }}
        >
          <div className={classes.alertDiv}>
            <Collapse in={updateChat}>
              <Alert
                severity="success"
                color="info"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setUpdateChat(false);
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                }
              >
                Successfully updated
              </Alert>
            </Collapse>
            <Collapse in={deleteChat}>
              <Alert
                severity="success"
                color="info"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setDeleteChat(false);
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                }
              >
                Successfully deleted
              </Alert>
            </Collapse>
          </div>
          <div className={classes.titleDiv}>
            <h1 className={classes.roomTitle}>ACS Announcements</h1>
            <CloseIcon
              className={classes.closeModal}
              onClick={closeDrawer}
              aria-label="Close Announcements"
            />
          </div>
          <Announcements
            user={user}
            setUpdateChat={setUpdateChat}
            setDeleteChat={setDeleteChat}
            announcements={announcements}
          />
        </Drawer>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Drawer
          anchor="right"
          open={messageToggle}
          onClose={handleClick}
          variant="temporary"
          PaperProps={{ style: { width: "100%" } }}
        >
          <div className={classes.alertDiv}>
            <Collapse in={updateChat}>
              <Alert
                severity="success"
                color="info"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setUpdateChat(false);
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                }
              >
                Successfully updated
              </Alert>
            </Collapse>
            <Collapse in={deleteChat}>
              <Alert
                severity="success"
                color="info"
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setDeleteChat(false);
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                }
              >
                Successfully deleted
              </Alert>
            </Collapse>
          </div>
          <div className={classes.titleDiv}>
            <h1 className={classes.roomTitle}>ACS Announcements</h1>
            <CloseIcon
              className={classes.closeModal}
              onClick={closeDrawer}
              aria-label="Close Announcements"
            />
          </div>
          <Announcements
            user={user}
            setUpdateChat={setUpdateChat}
            setDeleteChat={setDeleteChat}
            announcements={announcements}
          />
        </Drawer>
      </Hidden>
    </>
  );
}
