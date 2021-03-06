import React from "react";
// Reach Router imports
import { useParams, Link } from "@reach/router";
// Apollo-GraphQL imports
import { useMutation, useQuery } from "react-apollo";
import { CREATE_ACTIVITY, GET_ACTIVITIES } from "./graphql";
// Component imports
import ActivityForm from "./ActivityForm";
// import ActivityList from "./ActivityList";
import ActivityGroup from "./ActivityGroup";
// Material-UI imports
import { makeStyles, Box, Typography, Container } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    marginTop: "3.1rem",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  headingBox: {
    margin: "0 0 2rem 3rem",
    borderColor: "#D3D3D3",
  },
  linkBack: {
    color: "#202020",
    fontSize: "1.8rem",
    fontWeight: 530,
    display: "flex",
    alignItems: "center",
    marginBottom: "1.6rem",
    marginLeft: "0.3rem",
    textDecoration: "none",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
  activityCreation: {
    marginLeft: ".5rem",
    display: "flex",
    '@media (max-width: 1300px)': {
      flexDirection: "column",
    },
  },
  rightHalf: {
    '@media (max-width: 1300px)': {
      marginLeft: "-25px",
      marginBottom: "100px",
    },
    '@media (max-width: 700px)': {
      display: "none",
    },
  },
  eventInfo: {
    margin: "2rem 0 3rem 4rem",
    display: "flex",
    flexDirection: "column",
  },
  addedAct: {
    marginLeft: "4rem",
  },
  box: {
    margin: "2rem 0 0 4rem",
    "& p:nth-child(1)": {
      color: "blue",
    },
  },
  activityGroup: {
    width: '60%',
    marginLeft: '4rem',
  }
});

export default function CreateActivity() {
  const { eventId } = useParams();
  const [createActivity, { error, loading }] = useMutation(CREATE_ACTIVITY);
  const { data, refetch } = useQuery(GET_ACTIVITIES, {
    variables: {
      id: eventId,
    },
  });
  const classes = useStyles();
  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;
  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Link to={`/editEvent/${eventId}`} className={classes.linkBack}>
          <ArrowBackIosIcon color="primary" fontSize="large" />
          Edit Event
        </Link>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Add Activities to an Event
        </Typography>
      </Box>
      <Container className={classes.activityCreation}>
        <Box className={classes.form}>
          <ActivityForm
            data={data}
            createActivity={createActivity}
            eventId={eventId}
            refetch={refetch}
          />
        </Box>
        <Box className={classes.rightHalf}>
          <Box className={classes.eventInfo}>
            <Typography variant="h2">{data?.event?.title}</Typography>
            <Typography variant="h5" className={classes.subHeadings}>
              {data?.event?.startDate} - {data?.event?.endDate}
            </Typography>
            <Typography variant="h4" className={classes.subHeadings}>
              {data?.event?.location}
            </Typography>
          </Box>
          <Typography variant="h3" className={classes.addedAct}>
            Added Activities
          </Typography>
          {data?.event?.activities.length === 0 ? (
            <Box className={classes.box}>
              <Typography>No activities added yet!</Typography>
              <Typography>
                Use the form on the left to add activities to any of the days
                for the event.
              </Typography>
            </Box>
          ) : (
              <Box className={classes.activityGroup}>
                <ActivityGroup data={data} refetch={refetch} />
              </Box>
            )}
        </Box>
      </Container>
    </main>
  );
}
