import React, { useState, useEffect, useRef } from "react";
// Moment.js imports
import moment from "moment";
// Query / Mutations
import { useMutation } from "react-apollo";
import { DELETE_ANNOUNCEMENT } from "../../queries/Announcements";
import EditAnnouncementModal from "../Modals/EditAnnouncementModal";

//Auth0 imports
import config from "../../../../config/auth_config";

// Styling imports
import Tooltip from "@material-ui/core/Tooltip";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    border: "none",
    maxWidth: "95%",
    marginLeft: "1%",
  },
  messageText: {
    marginTop: "0",
    padding: "0 2%",
    fontSize: "1.5rem",
  },
  messageHeader: {
    marginBottom: "2%",
    padding: "1%",
    display: "flex",
    justifyContent: "space-between",
  },
  sender: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0",
  },
  messageBox: {
    display: "flex",
    alignItems: "center",
    marginTop: "1.5%",
    marginLeft: "3%",
    width: "97%",
  },
  messageSender: {
    backgroundColor: "#C4C4C480",
    padding: "1% 2%",
    fontSize: "1.5rem",
    width: "40%",
    borderRadius: "8px",
  },
  userMessage: {
    backgroundColor: "#2962ff51",
    padding: "1% 2%",
    fontSize: "1.5rem",
    width: "100%",
    borderRadius: "8px",
  },
  messageDiv: {
    maxHeight: "90vh",
    overflowY: "auto",
    overflowX: "hidden",
    margin: "0 8%",
  },
  header: {
    fontSize: "2rem",
    marginLeft: "4%",
  },
  iconDiv: {
    display: "flex",
    justifyContent: "space-between",
    width: "6%",
    marginLeft: "-100px",
  },
  editIcon: {
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
  },
  deleteIcon: {
    "&:hover": {
      cursor: "pointer",
      color: "red",
    },
  },
  btn: {
    backgroundColor: "none",
    background: "none",
    border: "none",
  },
  time: {
    textAlign: "center",
    fontSize: "1.6rem",
    fontStyle: "italic"
  }
}));

export default function Announcements({
  announcements,
  user,
  setUpdateChat,
  setDeleteChat,
}) {
  const classes = useStyles();

  const [announcementOpen, setAnnouncementOpen] = useState(false);
  const [announcementToEdit, setAnnouncementToEdit] = useState();

  const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT);

  const announcementArray =
    announcements &&
    announcements?.announcements?.map(announcement => {
      return {
        id: announcement.id,
        title: announcement.title,
        message: announcement.message,
        createdAt: announcement.createdAt,
      };
    });

  // Sets up an auto-scroll to last announcement when new announcement received, or when an announcement is updated/deleted
  const announcementsEndRef = useRef(null);

  const scrollToBottom = () => {
    announcementsEndRef.current &&
      announcementsEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [announcementArray]);

  const handleClose = () => {
    setAnnouncementOpen(false);
  };

  // Delete an announcement
  const deleteMessage = async announcement => {
    await deleteAnnouncement({
      variables: { id: announcement.id },
    });
    setDeleteChat(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.messageDiv}>
        {announcementArray.map(announcement => (
          <>
            <div key={announcement.id} className={classes.messageBox}>
              <div className={classes.userMessage}>
                <div>
                  <p className={classes.time}>{moment(announcement.createdAt).format("MMMM Do, YYYY")}</p>
                  <div className={classes.messageHeader}>
                    <p className={classes.sender}>{announcement.title}</p>
                    {user && user[config.roleUrl].includes("Admin") ? (
                      <div className={classes.iconDiv}>
                        <Tooltip title="Edit Announcement">
                          <button
                            onClick={() => {
                              setAnnouncementOpen(true);
                              setAnnouncementToEdit(announcement);
                            }}
                            className={classes.btn}
                          >
                            <EditOutlinedIcon className={classes.editIcon} />
                          </button>
                        </Tooltip>
                        <Tooltip title="Delete Announcement">
                          <button
                            onClick={() => deleteMessage(announcement)}
                            className={classes.btn}
                          >
                            <DeleteIcon className={classes.deleteIcon} />
                          </button>
                        </Tooltip>
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className={classes.messageText}>{announcement.message}</p>
                <div ref={announcementsEndRef} />
              </div>
            </div>
          </>
        ))}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={announcementOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <EditAnnouncementModal
            setAnnouncementOpen={setAnnouncementOpen}
            announcement={announcementToEdit}
            setUpdateChat={setUpdateChat}
          />
        </Modal>
      </div>
    </div>
  );
}
