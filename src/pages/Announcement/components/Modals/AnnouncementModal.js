import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import {
  CREATE_ANNOUNCEMENT,
  GET_RECIPIENTS,
} from "../../queries/Announcements";
import { CREATE_ANNOUNCEMENT_NOTIFICATION } from "../../queries/Notifications";

//Style imports
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, Button, Box, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  span: {
    fontSize: "2rem",
    color: "#2962FF",
    textAlign: "center",
    fontWeight: "normal",
    marginTop: "0%",
  },
  modal: {
    fontSize: "-webkit-xxx-large",
    width: "50%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeModal: {
    fontSize: "2rem",
    marginLeft: "100%",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
  titles: {
    fontSize: "1.5rem",
    marginBottom: "0",
    fontWeight: "normal",
  },
  titleDiv: {
    display: "flex",
    justifyContent: "center",
  },
  titleInput: {
    width: "100%",
  },
  buttonDiv: {
    marginTop: "5%",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    fontSize: "2rem",
    fontWeight: "bold",
    background: "#2962FF",
    color: "white",
    "&:hover": {
      color: "#2962FF",
    },
  },
}));

function AnnouncementModal({
  setAnnouncementOpen,
  setAlertOpen,
  validParticipants,
  user,
}) {
  const classes = useStyles();
  const { data } = useQuery(GET_RECIPIENTS);
  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT);
  const [createAnnouncementNotification] = useMutation(
    CREATE_ANNOUNCEMENT_NOTIFICATION
  );

  const [newAnnouncement, setNewAnnouncement] = useState();
  const [newAnnouncementText, setNewAnnouncementText] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleTitleChange = e => {
    setNewAnnouncement(e.target.value);
  };

  const handleMessageChange = e => {
    setNewAnnouncementText(e.target.value);
  };

  useEffect(() => {
    newAnnouncementText === undefined || newAnnouncement === undefined
      ? setButtonDisabled(true)
      : setButtonDisabled(false);
  }, [newAnnouncementText, newAnnouncement]);

  //Create array of emails to match BE data shape, exclude yourself
  const allUserEmails = data?.profiles
    ?.map(
      participant =>
        user.email !== participant.email && { email: participant.email }
    )
    .filter(participant => participant !== false);

  // Send announcement to BE & all users
  const onSubmit = e => {
    e.preventDefault();
    createAnnouncement({
      variables: {
        title: newAnnouncement,
        message: newAnnouncementText,
        isAnnouncementRoom: true,
        participants: allUserEmails,
      },
    }) &&
      allUserEmails.forEach(user => {
        createAnnouncementNotification({
          variables: {
            email: user.email,
            label: "Announcement",
          },
        });
      });
    setAnnouncementOpen(false);
    setAlertOpen(true);
  };

  const closeModal = e => {
    e.preventDefault();
    setAnnouncementOpen(false);
  };

  const checkIfTitleEmpty = e => {
    if (e.target.value === "") {
      alert("Announcement Title is required");
    }
  };

  const checkIfBodyEmpty = e => {
    if (e.target.value === "") {
      alert("Announcement Title is required");
    }
  };

  return (
    <div className={classes.modal}>
      <div className={classes.paper}>
        <Tooltip title="Cancel">
          <CloseIcon className={classes.closeModal} onClick={closeModal} />
        </Tooltip>
        <h2 id="transition-modal-title" className={classes.span}>
          Create New Announcement
        </h2>
        <h3 className={classes.titles}>Announcement Title</h3>
        <div className={classes.titleDiv}>
          <Box component="div" className={classes.titleInput}>
            <TextField
              onBlur={checkIfTitleEmpty}
              placeholder="Required field"
              variant="outlined"
              type="text"
              fullWidth
              name="announcementTitle"
              value={newAnnouncement}
              onChange={handleTitleChange}
            />
          </Box>
        </div>
        <h3 className={classes.titles}>Announcement Text</h3>
        <div className={classes.titleDiv}>
          <Box component="div" className={classes.titleInput}>
            <TextField
              onBlur={checkIfBodyEmpty}
              placeholder="Required field"
              variant="outlined"
              multiline={true}
              rows={2}
              rowsMax={4}
              fullWidth
              type="text"
              name="announcementText"
              value={newAnnouncementText}
              onChange={handleMessageChange}
            />
          </Box>
        </div>
        <div className={classes.buttonDiv}>
          <Tooltip title="Send Announcement">
            <Button
              variant="outlined"
              color="primary"
              onClick={onSubmit}
              className={classes.button}
              disabled={buttonDisabled}
            >
              Send Announcement
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementModal;
