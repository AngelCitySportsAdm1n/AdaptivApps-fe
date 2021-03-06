import React, { useState, useEffect } from "react";
import NavLink from "../SideNav/NavLink";
// Material-UI imports
import { makeStyles, TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  search: {
    width: "100%",
    height: "40px",
    padding: "0 10px",
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    border: "1px solid rgb(223, 223, 223)",
    "& .MuiInputBase-root": {
      fontSize: "1.4rem",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none",
    },
  },
  searchIcon: {
    color: "#808080",
    fontSize: "2.5rem",
  },
  item: {
    display: "inline-block",
    overflow: "hidden",
    width: "100%",
    padding: "8px 10px",
    fontSize: "1.6rem",
    lineHeight: "1.6rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#FFCC01",
      color: "white",
    },
  },
  empty: {
    backgroundColor: "orange",
  },
  searchResults: {
    maxHeight: "250px",
    overflow: "auto",
  },
});

export default function Dropdown(props) {
  const classes = useStyles();
  const { profilesData, setTitle, keyword, setKeyword } = props;
  const [tempList, setTempList] = useState(profilesData);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = e => {
    setKeyword(e.target.value.toLowerCase());
  };

  const handleSelect = item => {
    setTitle(item.firstName);
  };

  useEffect(() => {
    const results = profilesData
      ?.filter(profile => profile?.name.toLowerCase().includes(keyword))
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    setTempList(keyword.length > 0 ? results : "");
    if (keyword.length > 0) {
      setIsSearching(true);
    }
    if (keyword.length < 1) {
      setIsSearching(false);
    }
  }, [profilesData, keyword, setKeyword]);

  return (
    <div>
      <TextField
        className={classes.search}
        placeholder="Enter user first and last name here..."
        onChange={handleChange}
        type="search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.searchResults}>
        {tempList !== ""
          ? tempList.map(item => (
              <NavLink to={`/user/${item.username}`} key={item.id}>
                <button
                  aria-label={`Click to visit ${item.name}'s profile`}
                  type="button"
                  key={item.id}
                  className={classes.item}
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </button>
              </NavLink>
            ))
          : null}
        {tempList.length < 1 && isSearching ? (
          <div className={`${classes.item} ${classes.empty}`}>No results</div>
        ) : null}
      </div>
    </div>
  );
}
