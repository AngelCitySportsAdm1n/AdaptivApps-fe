import React from 'react';
import { useNavigate } from "@reach/router";
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  img: {
    marginLeft: "5px",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
  },
}));

const CustomPeopleIcon = ({ chattingIcon, chattingUsername }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Tooltip title="Visit profile" onClick={() => navigate(`/user/${chattingUsername}`)}>
      <div>
        <img src={chattingIcon} alt="icon for user" className={classes.img} />
      </div>
    </Tooltip>
  )
}

export default CustomPeopleIcon;