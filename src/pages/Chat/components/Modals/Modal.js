import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { GET_RECIPIENTS } from '../../queries/Chats';
import { CREATE_CHAT_ROOM } from '../../queries/ChatRooms'
//Style imports
import Alert from '@material-ui/lab/Alert';
import {
    makeStyles,
    Box,
    TextField,
    ListItem,
    Paper,
    List,
    ListItemText,
  } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(theme => ({
  span: {
    fontSize: '2rem',
    color: '#2962FF',
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: '0%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: "-webkit-xxx-large",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '2% 1%',
    '&:hover': {
      color: '#2962FF',
      cursor: 'pointer',
      borderRadius: '5px'
    }
  },
  closeModal: {
    fontSize: "2rem",
    marginLeft: '100%',
    border: "none",
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF"
    },
    '&:focus': {
      outline: "none"
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: "-webkit-xxx-large",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  search: {
    textAlign: 'center',
    fontSize: '2rem',
    lineHeight: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2962FF'
  },
  noSearch: {
    display: 'none'
  },
  errorState: {
    display: 'block',
    width: '95%',
    fontSize: '2.2rem',
    textAlign: 'center',
    fontWeight: 'bold',
    '& p': {
      marginTop: '-4%'      
    },
    '& p:first-child': {
      color: 'red'      
    },
  },
  errorClose: {
    fontSize: "2rem",
    color: 'black',
    marginLeft: '85%',
    marginTop: '5%',
    border: "none",
    '&:hover': {
      cursor: "pointer",
      color: "#2962FF"
    },
    '&:focus': {
      outline: "none"
    }
  },
  noError: {
    display: 'none'
  }
}));

function RecipientModal({ user, setOpen, participants, setNewRoom }) {
    const classes = useStyles();
    const [searchRecipient, setSearchRecipient] = useState("");
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState(false);
    const [errorState, setErrorState] = useState(false);
    console.log(errorState)

    const { data } = useQuery(GET_RECIPIENTS);
    const [createChatRoom] = useMutation(CREATE_CHAT_ROOM);
  
    const searchContacts = e => {
      e.preventDefault();
      let filter = data?.profiles.map(user => {
        if (user !== null) {
          return [`${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`, user]
        }
      },
      setSearchText(false)
      );
      filter.filter(user => {
        if (user[0].includes(searchRecipient.toLowerCase())) {
          results.push(user[1])
          return results;
        } else {
          setErrorState(true);
        }
      });
      setSearchRecipient('');
    };

    const participantsEmail = participants.map(item => (item.firstName !== null && item.lastName !== null) && item.email)
    const uniqueEmails = [...new Set(participantsEmail)]

    const newChatRoom = async (item) => {
        await (createChatRoom({
        variables:{
          useremail: user.email,
          recipientemail: item.email
        }
      }));

      setOpen(false);
      setNewRoom(true);
    };

    const handleChange = e => {
      setResults([]);
      setSearchRecipient(e.target.value);
    };

    const closeModal = e => {
      e.preventDefault();
      setOpen(false);
    };

    const searchResults = results.length > 0 &&
    (results.map(item => {
      const filtered = uniqueEmails.filter(email => email === item.email)
      if (filtered[0] !== item.email) {
        return (
          <ListItem className={classes.listItem} value={`${item.firstName} ${item.lastName}`} onClick={() => newChatRoom(item)}>
            <ListItemText primary={`${item.firstName} ${item.lastName}`} />
          </ListItem>
        )
      }
      }))
      const chatResults = !results.length && data && data?.profiles.map(item => {
        const filtered = uniqueEmails.filter(email => email === item.email)
        if (filtered[0] !== item.email) {
          return (
            <ListItem className={classes.listItem} value={`${item.firstName} ${item.lastName}`} onClick={() => newChatRoom(item)}>
                <ListItemText primary={`${item.firstName} ${item.lastName}`} />
              </ListItem>
          )
        }
        })

      
    return (
     <div>          
      <div className={classes.paper}>
        <CloseIcon className={classes.closeModal} onClick={closeModal} />
        <h2 id="transition-modal-title" className={classes.span} aria-label="Select a Chat Recipient">Select a Chat Recipient</h2>
        <div>       
          <Box component="div">
            <TextField
              onKeyPress={() => setSearchText(true)}
              variant="outlined"
              type="text"
              placeholder="Search for a Recipient"
              name="message"
              value={searchRecipient}
              onChange={handleChange}
              InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                  <IconButton onClick={searchContacts}>
                    <SearchIcon fontSize="large" />
                  </IconButton>
                </InputAdornment>
              }} />
            <div className={classes.root}>
              <div>
              <Paper style={{maxHeight: 200, overflow: 'auto'}}>
              <List>
                  <div className={errorState ? classes.errorState : classes.noError}>
                    
                    <p><CloseIcon className={classes.errorClose} onClick={() => setErrorState(false)} /> We couldn't find that user </p>
                    <p>Are you chatting with this person already?</p>
                    </div>
                {searchResults}
                {!results.length && 
                <div className={!searchText ? classes.search : classes.noSearch}>
                  <p>Search for a user above or</p> 
                  <p>choose from the list below!</p>
                  </div>}
                {chatResults}
                </List>
                </Paper>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default RecipientModal;