import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_CHAT_ROOM } from "../../queries/ChatRooms";
import {
  GET_RECIPIENTS,
  SHOW_CHATROOM_SENDER,
  SHOW_CHATROOM_RECEIVER,
} from "../../queries/Chats";

//Style imports
import {
  makeStyles,
  Box,
  TextField,
  ListItem,
  Paper,
  List,
  ListItemText,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { recip } from "prelude-ls";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  span: {
    fontSize: "2rem",
    color: "#2962FF",
    textAlign: "center",
    fontWeight: "normal",
    marginTop: "0%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "-webkit-xxx-large",
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: "2% 1%",
    "&:hover": {
      color: "#2962FF",
      cursor: "pointer",
      borderRadius: "5px",
    },
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    margin: "2% auto",
    border: "none",
    background: "none",
    backgroundColor: "none",
    "&:hover": {
      color: "#2962FF",
      cursor: "pointer",
      borderRadius: "5px",
    },
  },
  closeModal: {
    fontSize: "2rem",
    marginLeft: "100%",
    border: "none",
    background: "none",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
    "&:focus": {
      outline: "none",
    },
  },
  search: {
    textAlign: "center",
    fontSize: "2rem",
    lineHeight: "10px",
    fontWeight: "bold",
    color: "#2962FF",
  },
  noSearch: {
    display: "none",
  },
  errorState: {
    display: "block",
    width: "95%",
    fontSize: "2.2rem",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "15px",
    "& p:first-child": {
      color: "red",
      marginTop: "5%",
    },
  },
  errorClose: {
    fontSize: "1.25rem",
    color: "black",
    fontWeight: "bolder",
    "&:hover": {
      cursor: "pointer",
      color: "#2962FF",
    },
  },
  noError: {
    display: "none",
  },
}));

function RecipientModal({ user, setOpen, allChatrooms, setNewRoom }) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allUsers } = useQuery(GET_RECIPIENTS);
  const [createChatRoom] = useMutation(CREATE_CHAT_ROOM);
  const [showChatroomSender] = useMutation(SHOW_CHATROOM_SENDER);
  const [showChatroomReceiver] = useMutation(SHOW_CHATROOM_RECEIVER);

  // Return a list of all currently available chatrooms in term of users
  const hiddenChatRooms = [];
  const currentChatRooms = [];
  for (let i = 0; i < allChatrooms?.profile?.chatRooms?.length; i++) {
    if (
      allChatrooms.profile.chatRooms[i].senderEmail === user.email &&
      !allChatrooms.profile.chatRooms[i].displayForSender
    ) {
      hiddenChatRooms.push(allChatrooms.profile.chatRooms[i]);
    } else if (
      allChatrooms.profile.chatRooms[i].senderEmail !== user.email &&
      !allChatrooms.profile.chatRooms[i].displayForReceiver
    ) {
      hiddenChatRooms.push(allChatrooms.profile.chatRooms[i]);
    } else {
      const current = allChatrooms.profile.chatRooms[i].participants.filter(
        participant => participant.email !== user.email
      );
      currentChatRooms.push(current[0]);
    }
  }

  const availableToChat = [];
  allUsers &&
    allUsers.profiles.map(person => {
      // console.log("person", person);
      let unique = currentChatRooms.find(item => item.email === person.email);
      if (
        unique === undefined &&
        person.email !== user.email &&
        person.userName !== null
      ) {
        availableToChat.push(person);
      }
    });

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const results = !searchTerm
    ? availableToChat
    : availableToChat.filter(
        person =>
          person?.firstName?.toLowerCase().includes(searchTerm) ||
          person?.lastName?.toLowerCase().includes(searchTerm) ||
          person?.extProfile?.orgName?.toLowerCase().includes(searchTerm)
      );

  const checkHiddenChats = (hiddenChatRooms, recipient) => {
    for (let i = 0; i < hiddenChatRooms.length; i++) {
      const email1 = hiddenChatRooms[i].participants[0].email;
      const email2 = hiddenChatRooms[i].participants[1].email;
      if (recipient.email === email1 || recipient.email === email2) {
        if (
          hiddenChatRooms[i].senderEmail === user.email &&
          !hiddenChatRooms[i].displayForSender
        ) {
          return hiddenChatRooms[i].id;
        } else if (
          hiddenChatRooms[i].senderEmail === recipient.email &&
          !hiddenChatRooms[i].displayForReceiver
        ) {
          return hiddenChatRooms[i].id;
        }
      }
    }
    return false;
  };

  const checkAmISender = roomID => {
    for (let i = 0; i < allChatrooms?.profile.chatRooms.length; i++) {
      if (allChatrooms.profile.chatRooms[i].id === roomID) {
        return allChatrooms.profile.chatRooms[i].senderEmail === user.email;
      }
    }
    return false;
  };

  const createNewChatRoom = async recipient => {
    const roomID = checkHiddenChats(hiddenChatRooms, recipient);
    if (!roomID) {
      await createChatRoom({
        variables: {
          useremail: user.email,
          recipientemail: recipient.email,
        },
      });
    } else {
      if (checkAmISender(roomID)) {
        await showChatroomSender({
          variables: {
            id: roomID,
          },
        });
      } else {
        await showChatroomReceiver({
          variables: {
            id: roomID,
          },
        });
      }
    }
    setOpen(false);
    setNewRoom(true);
  };

  const closeModal = e => {
    e.preventDefault();
    setOpen(false);
  };

  const handleChatRoomSearch = e => {
    if (e.key === "Enter") {
      var button = document.getElementById("chatSearch");
      button.click();
    }
  };

  return (
    <div className={classes.root}>
      <button
        aria-label="Close the search modal"
        onClick={closeModal}
        className={classes.closeModal}
      >
        <CloseIcon />
      </button>
      <h2
        id="transition-modal-title"
        className={classes.span}
        aria-label="Select a Chat Recipient"
      >
        Select a Chat Recipient
      </h2>
      <div>
        <Box component="div">
          <TextField
            variant="outlined"
            type="text"
            placeholder="Type name here..."
            autoFocus
            name="message"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon fontSize="large" />
                </InputAdornment>
              ),
            }}
          />
          <div>
            <Paper style={{ maxHeight: 200, overflow: "auto" }}>
              <List className={classes.searchContainer}>
                <div
                  className={!searchTerm ? classes.search : classes.noSearch}
                >
                  <p>Search for a user above or</p>
                  <p>choose from the list below!</p>
                </div>
                {results.map(user => (
                  <button
                    aria-label={
                      user.firstName
                        ? `Create new message with ${user.firstName} ${user.lastName}`
                        : `Create new message with ${user.extProfile.orgName}`
                    }
                    className={classes.btn}
                    onClick={() => createNewChatRoom(user)}
                  >
                    <ListItem
                      value={
                        user.firstName
                          ? `${user.firstName} ${user.lastName}`
                          : `${user.extProfile.orgName}`
                      }
                      aria-label={
                        user.firstName
                          ? `${user.firstName} ${user.lastName}`
                          : `${user.extProfile.orgName}`
                      }
                      onKeyDown={e => handleChatRoomSearch(e)}
                      id="chatSearch"
                    >
                      <ListItemText
                        primary={
                          user.firstName
                            ? `${user.firstName} ${user.lastName}`
                            : `${user.extProfile.orgName}`
                        }
                      />
                    </ListItem>
                  </button>
                ))}
              </List>
            </Paper>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default RecipientModal;
