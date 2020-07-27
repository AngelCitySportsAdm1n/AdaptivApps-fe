import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import moment from "moment";
import HashMap from "hashmap";
import { Typography, makeStyles, Button } from "@material-ui/core";
import SmallButton from "../../theme/LargeFormButton";

const useStyles = makeStyles(theme => ({
  eventGroup: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "& h1": {
      fontWeight: "600",
      color: "#808080",
    },
    "& h3": {
      fontWeight: "500",
      color: "#808080",
    },
    marginBottom: "20px",
  },
  eventCard: {
    display: "flex",
    flexWrap: "wrap",
  },
  p: {
    fontSize: "1.6rem",
  },
  largeFormBtn: {
    color: "red",
  },
  button: {
    border: "2px solid #2962FF",
    color: "#2962FF",
    height: "4rem",
    width: "20rem",
    fontSize: "2.5rem",
    textTransform: "none",
    margin: "1rem 0",
  },
}));

export default function EventList({ currentEvents, refetch, user }) {
  const [pastEvents, setPastEvents] = useState(false);
  const classes = useStyles();
  var eventsMap = new HashMap();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (currentEvents) {
    const sortedEvents = currentEvents?.sort((a, b) => {
      if (a.startDate < b.startDate) return -1;
      else if (a.startDate > b.startDate) return 1;
      else return 0;
    });
    for (let i = 0; i < sortedEvents.length; i++) {
      const startDate = sortedEvents[i].startDate;
      if (eventsMap.has(startDate)) {
        // Push this event
        eventsMap.get(startDate).push(sortedEvents[i]);
      } else {
        // Create new entry
        const events = [];
        events.push(sortedEvents[i]);
        eventsMap.set(startDate, events);
      }
    }
  }

  const allDates = eventsMap.keys();

  //turn on/off past events

  const todayDate = new Date();
  let today =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1 < 10 ? "0" : "") +
    (todayDate.getMonth() + 1) +
    "-" +
    (todayDate.getDate() < 10 ? "0" : "") +
    todayDate.getDate();

  useEffect(() => {}, [pastEvents, setPastEvents]);

  return (
    <>
      {pastEvents === false ? (
        <Button
          onClick={() => setPastEvents(true)}
          className={classes.button}
          variant="outlined"
          color="primary"
          type="submit"
          aria-label="Click here to see past events"
        >
          Past Events
        </Button>
      ) : (
        <Button
          onClick={() => setPastEvents(false)}
          className={classes.button}
          variant="outlined"
          color="primary"
          type="submit"
          aria-label="Click here to see upcoming events"
        >
          Upcoming Events
        </Button>
      )}
      {allDates.length > 0 ? (
        <div>
          {allDates.map((date, idx) =>
            date >= today && pastEvents === false ? (
              <div className={classes.eventGroup} key={idx}>
                <Typography variant="h1">
                  {
                    moment(date)
                      .format("dddd, MMMM Do YYYY")
                      .split(", ")[0]
                  }
                </Typography>
                <Typography variant="h3">
                  {
                    moment(date)
                      .format("dddd, MMMM Do YYYY")
                      .split(", ")[1]
                  }
                </Typography>
                <div className={classes.eventCard}>
                  {eventsMap.get(date).map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      refetch={refetch}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            ) : date < today && pastEvents === true ? (
              <div className={classes.eventGroup} key={idx}>
                <Typography variant="h1">
                  {
                    moment(date)
                      .format("dddd, MMMM Do YYYY")
                      .split(", ")[0]
                  }
                </Typography>
                <Typography variant="h3">
                  {
                    moment(date)
                      .format("dddd, MMMM Do YYYY")
                      .split(", ")[1]
                  }
                </Typography>
                <div className={classes.eventCard}>
                  {eventsMap.get(date).map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      refetch={refetch}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p className={classes.p}>
          No events available for now. Come back later!
        </p>
      )}
    </>
  );
}
