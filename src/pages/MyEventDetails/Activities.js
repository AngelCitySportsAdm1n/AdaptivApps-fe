import React, { useEffect } from "react";
// Component imports
import Activity from "./Activity";
// Material-UI imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& tr": {
      display: "flex",
    },
    "& th": {
      margin: "0",
      fontWeight: 550,
      fontSize: "1.6rem",
      width: "15rem",
      padding: "1% 1% 0 0",
      textAlign: "left",
    },
  },
  subHeadings: {
    color: "#808080",
  },
}));

export default function Activities({ refetch, value, activeEvent, currentActivities }) {
  const classes = useStyles();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={classes.root}>
      {currentActivities?.map((activity, id) => (
        <Activity
          key={id}
          activeEvent={activeEvent}
          activity={activity}
          refetch={refetch}
          value={value}
        />
      ))}
    </div>
  );
}
