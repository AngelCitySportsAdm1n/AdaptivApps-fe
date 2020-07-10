import React, { useEffect } from "react";
// Google Analytics Imports
import ReactGA from "react-ga";
import { useQuery, useMutation } from "react-apollo";
import moment from "moment";
// import ActivityGroup from "./ActivityGroup";
import { useAuth0 } from "../../config/react-auth0-spa";
import CircularProgress from "@material-ui/core/CircularProgress";
import eventImg from "../../assets/images/acs_hartford.png";

import { useParams, Link } from "@reach/router";
// import { useNavigate } from "@reach/router";
import { GET_EVENT_ACTIVITIES } from "./queries/getActivities";
import { REGISTER_FOR_EVENT } from "./queries/ActivityRegister";
import {
  UNREGISTER_FROM_EVENT,
  UNREGISTER_FROM_ALL,
  GET_ATTENDEES,
  GET_PARTICIPANTS,
  UNREGISTER_FROM_EVENT_ACTIVITY,
  GET_USER_EVENTS,
} from "../MyEvents/queries";

import { makeStyles, Box, Typography, Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    width: "90%",
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    "& th": {
      fontSize: "1.6rem",
    },
  },
  headingBox: {
    margin: "6rem 0 2rem 3rem",
    fontWeight: "400",
    borderColor: "#D3D3D3",
  },
  eventContainer: {
    display: "flex",
    marginLeft: "3rem",
    flexDirection: "column",
  },
  imgContainer: {
    display: "flex",
    width: "36rem",
    height: "16rem",
  },
  img: {
    width: "100%",
    padding: "0",
    height: "16rem",
    objectFit: "cover",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "2.4rem",
    "@media (max-width: 1050px)": {
      marginTop: "20px",
    },
  },
  date: {
    fontSize: "1.4rem",
  },
  title: {
    fontSize: "2.1rem",
    margin: ".4rem 0",
    fontWeight: "500",
    color: "#3C3C3C",
  },
  loc: {
    fontSize: "1.6rem",
  },
  activityC: {
    "& tr": {
      display: "flex",
      alignItems: "center",
      textAlign: "left",
    },
    "& th": {
      fontWeight: 550,
      fontSize: "1.6rem",
      width: "19.6rem",
      padding: "1% 0 2% 0",
      textAlign: "left",
    },
  },
  myActivities: {
    fontWeight: "bold",
    fontSize: "1.8rem",
    margin: "3rem 0 2rem 3rem",
  },
  headerRow: {
    textAlign: "left",
    fontSize: "1.8rem",
  },
  tableH: {
    color: "#202020",
    width: "20rem",
  },
  grid: {
    width: "100%",
  },
  activityH: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  details: {
    fontSize: "1.6rem",
    maxWidth: "80rem",
    margin: "2rem 0 0 3rem",
  },
  loadingSpinner: {
    position: "absolute",
    top: "50%",
    right: "50%",
    color: "#2763FF",
  },
  back: {
    display: "flex",
    alignItems: "center",
    color: "black",
    margin: "0 0 2% 0",
    fontSize: "1.8rem",
    textDecoration: "none",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 950px)": {
      flexDirection: "column",
    },
  },
  virtualBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "3rem",
    "& p": {
      margin: 0,
      fontSize: "1.6rem",
    },
    "& a": {
      marginTop: "2rem",
      color: "#2862ff",
      fontSize: "1.6rem",
      textDecoration: "none",
    },
  },
  modalBtn1: {
    padding: "1rem ",
    margin: "2rem 1.5rem 0 3rem",
    fontSize: "2.4rem",
    color: "#2962FF",
    borderRadius: "5px",
    border: "2px solid #2962FF",
    textTransform: "none",
    boxSizing: "border-box",
    fontWeight: "900",
    "&:hover": {
      background: "#2962FF",
      color: "white",
    },
  },
});
/**
 * Event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const trackAttendees = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default function ActivityList() {
  const classes = useStyles();
  const { user } = useAuth0();
  // const navigate = useNavigate();
  const { eventId } = useParams();
  const [registerForEvent] = useMutation(REGISTER_FOR_EVENT);
  const [unregisterFromEvent] = useMutation(UNREGISTER_FROM_EVENT);
  const [unregisterFromAll] = useMutation(UNREGISTER_FROM_ALL);
  const [
    unregisterFromEventActivity,
  ] = useMutation(UNREGISTER_FROM_EVENT_ACTIVITY, { fetchPolicy: "no-cache" });
  const { data, refetch } = useQuery(GET_USER_EVENTS, {
    variables: { email: user.email },
    fetchPolicy: "no-cache",
  });
  const { loading, error, data: activityData } = useQuery(
    GET_EVENT_ACTIVITIES,
    {
      variables: { id: eventId },
      fetchPolicy: "no-cache",
    }
  );
  // const { data, refetch: participantRefetch } = useQuery(GET_PARTICIPANTS, {
  //   variables: { email: user.email, id: eventId },
  //   fetchPolicy: "no-cache",
  // });
  const { data: attendeeData } = useQuery(GET_ATTENDEES, {
    variables: { email: user.email, id: eventId },
    fetchPolicy: "no-cache",
  });

  const processAttendeeID = () => {
    if (activityData.event && activityData.event.attendees) {
      for (let i = 0; i < activityData.event.attendees.length; i++) {
        if (activityData.event.attendees[i].eventProfile.email === user.email)
          return activityData.event.attendees[i].id;
      }
    } else {
      return false;
    }
  };

  const registerEvent = async () => {
    const attendeeIdValue = !processAttendeeID() ? "" : processAttendeeID();
    await registerForEvent({
      variables: {
        attendeeId: attendeeIdValue,
        eventId: activityData?.event?.id,
        eventProfile: user.email,
      },
    });
    await alert("You are registered for this event!");
    window.location.reload();
  };
  console.log("activity data", data);

  // Unregisters user from specified event and all it's activities
  const eventUnregister = async () => {
    const participantId = data?.participants?.map(participant => {
      if (participant) {
        if (participant.activityProfile.email === user.email) {
          return participant?.id;
        }
      }
    });
    const attendeeId = attendeeData?.participants?.map(attendee => {
      if (attendee) {
        if (attendee.eventProfile.email === user.email) {
          return attendee?.id;
        }
      }
    });
    const participantIdValue = JSON.stringify(participantId)?.replace(
      /[\[\]"]+/g,
      ""
    );
    const attendeeIdValue = JSON.stringify(attendeeId).replace(/[\[\]"]+/g, "");
    data?.participants && data?.participants?.length === 1
      ? await unregisterFromEventActivity({
          variables: {
            attendeeId: attendeeIdValue,
            email: user?.email,
            participantId: participantIdValue,
          },
        })
      : data && data?.participants === null
      ? await unregisterFromEvent({
          variables: {
            attendeeId: attendeeIdValue,
            email: user?.email,
          },
        })
      : await unregisterFromAll({
          variables: {
            attendeeId: attendeeIdValue,
            email: user?.email,
            participantId: participantId,
          },
        });
    await alert("You have successfully unregistered for this event!");
    await refetch();
    window.location.reload();
  };
  useEffect(() => {
    refetch();
  }, [data, refetch]);
  console.log("data in activity list", attendeeData?.participants?.length);
  if (loading) return <CircularProgress className={classes.loadingSpinner} />;
  if (error) return `Error! ${error.message}`;

  return (
    <main className={classes.root}>
      <Box className={classes.headingBox} borderBottom={2}>
        <Link
          to="/calendar"
          aria-label="Navigate back to Events Calendar page."
          className={classes.back}
        >
          <ArrowBackIosIcon
            color="primary"
            aria-label="Back to Events Calendar"
            fontSize="large"
          />
          Back to Events Calendar
        </Link>
        <Typography className={classes.heading} variant="h1" gutterBottom>
          Event Details
        </Typography>
      </Box>
      <Box className={classes.eventContainer}>
        <div className={classes.top}>
          <Box className={classes.imgContainer}>
            <img
              className={classes.img}
              src={
                (activityData && activityData?.event?.imgUrl === null) ||
                activityData?.event?.imgUrl === undefined ||
                activityData?.event?.imgUrl === ""
                  ? eventImg
                  : activityData?.event?.imgUrl
              }
              alt="Event"
            />
          </Box>
          <Box className={classes.infoContainer}>
            <Typography
              className={classes.date}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {moment(activityData?.event?.startDate).format("MM/DD/YYYY")} -{" "}
              {moment(activityData?.event?.endDate).format("MM/DD/YYYY")}
            </Typography>
            <Typography className={classes.title}>
              {activityData?.event?.title}
            </Typography>
            <Typography
              className={classes.loc}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {activityData.event.location}
            </Typography>
          </Box>
        </div>
        {activityData.event.type === "Virtual" ? (
          <Box className={classes.virtualBox}>
            {activityData.event.host !== "" ? (
              <p>Hosted by: {activityData.event.host}</p>
            ) : null}
            {activityData.event.coaches !== "" ? (
              <p>Coach(es): {activityData.event.coaches}</p>
            ) : null}
            {activityData.event.speakers !== "" ? (
              <p>Special Guest Speaker(s): {activityData.event.speakers}</p>
            ) : null}

            <a
              href={activityData.event.link}
              rel="noopener noreferrer"
              target="_blank"
              onClick={() =>
                trackAttendees(
                  "Event",
                  "Joined Virtual Event",
                  "ATTENDEE_ADDED"
                )
              }
            >
              Click Here to Join Us!
            </a>
          </Box>
        ) : null}
      </Box>
      <Box className={classes.details}>{activityData.event.details}</Box>
      {attendeeData && attendeeData?.participants?.length > 0 ? (
        <Button
          aria-label={`Click to unregister ${activityData?.event?.title}`}
          className={classes.modalBtn1}
          onClick={eventUnregister}
        >
          Unregister from Event
        </Button>
      ) : (
        <Button
          aria-label={`Sign up for ${activityData?.event?.title}`}
          className={classes.modalBtn1}
          onClick={registerEvent}
        >
          Click here to Add to My Events!
        </Button>
      )}
      {/*activityData.event.activities.length >= 1 ? (
        <Box className={classes.activityC}>
          <p className={classes.myActivities}>Activities Schedule</p>
          <table className={classes.table}>
            <tbody>
              <ActivityGroup activityData={activityData} refetch={refetch} />
            </tbody>
          </table>
        </Box>
      ) : null*/}
    </main>
  );
}
