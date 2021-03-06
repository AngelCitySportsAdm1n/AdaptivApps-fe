import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

import {
  makeStyles,
  InputLabel,
  Input,
  Button,
  Paper,
  Chip
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  tagContainer: {
    margin: '3% auto 0',
  },
  inputLabel: {
    margin: '5% auto',
    textAlign: 'center'
  },
  search: {
    width: '100%',
    marginTop: '5%'
  },
  chip: {
    margin: theme.spacing(0.5),
    fontSize: '2.5rem',
  },
  btn: {
    display: "flex",
    width: "30px",
    background: "transparent",
    boxShadow: "none",
    border: "none",
    margin: 'auto',
    padding: "3%",
    "&:hover": {
      background: "none",
      boxShadow: "none",
    }
  }
}));

export default function TagInput(props) {
  const { tags, setTags } = props;
  const [currentTag, setCurrentTag] = useState("");
  const classes = useStyles();
  let key = 0;

  const handleChange = e => {
    setCurrentTag(e.target.value.toLowerCase());
  }

  const handleSubmit = async () => {
    if (tags) {
      await setTags([...tags, currentTag])
    } else {
      await setTags([currentTag])
    }
    setCurrentTag("");
  }

  const handleDelete = async tag => {
    const tempList = [];
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] !== tag) {
        tempList.push(tags[i]);
      }
    }
    // let temp = tags.filter(item => item !== tag)
    await setTags(tempList);
  }

  return (
    <div className={classes.tagContainer}>
      <InputLabel className={classes.inputLabel} htmlFor="tags">
        Meta Tags
        </InputLabel>
      {tags && tags.length > 0 ? <Paper component="ul" className={classes.paper}>
        {tags && tags.map(tag => {
          key += 1;
          return (
            <li key={key}>
              <Chip
                label={tag}
                className={classes.chip}
                onDelete={() => handleDelete(tag)}
              />
            </li>
          )
        })}
      </Paper> : null}
      <Input
        className={classes.search}
        placeholder="Add a tag"
        onChange={handleChange}
        value={currentTag}
      />
      <Button
        className={classes.btn}
        variant="contained"
        onClick={handleSubmit}
      >
        <IoIosAddCircle style={{ "fontSize": "25px" }} />
      </Button>
    </div>
  )
}
