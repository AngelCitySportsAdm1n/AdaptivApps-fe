import React from "react";
// Component imports
import Activity from "./Activity";
// Material-UI imports
import { makeStyles, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: "3rem",
    "& tr": {
      display: "flex",
    },
    "& th": {
      margin: "0",
      fontWeight: 550,
      fontSize: "1.6rem",
      width: "15rem",
      padding: "1% 1% 2% 0",
      textAlign: "left",
    },
  },
  subHeadings: {
    color: '#808080',
  },
}));

export default function ActivityList({ data, refetch }) {
  const classes = useStyles();
  console.log("inside ActivityList", data);
  return (
    <div className={classes.root}>
      <Box>
        <Typography variant="h2">{data?.event?.title}</Typography>
        <Typography variant="h5" className={classes.subHeadings}>{data?.event?.date}</Typography>
        <Typography variant="h4" className={classes.subHeadings}>{data?.event?.location}</Typography>
      </Box>
      
      <h1>Added Activities</h1>
      {data?.event?.activities.length === 0 ? (
        <>
          <p>No activities added yet!</p>
          <p>
            Use the form on the left to add activities to any of the days for
            the event.
          </p>
        </>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Time</th>
            </tr>
          </thead>
        
          {data?.event?.activities.map((activity, id) => (
            <Activity key={id} activity={activity} refetch={refetch} />
          ))}
        </table>
      )}
    </div>
  );
}