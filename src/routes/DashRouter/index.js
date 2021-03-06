// React imports
import React from "react";
// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";
// Component imports
import SideNav from "./SideNav";
// Styling imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: "100vw",
    display: "flex",
    padding: "0",
    backgroundColor: "red",
    minHeight: "100vh",
  },
  box: {
    width: "100%",
    margin: "0",
    backgroundColor: "#FFFFFF",
  },
});

const DashRouter = ({ children }) => {
  const classes = useStyles();
  const { user } = useAuth0();

  return (
    <div className={classes.root}>
      <SideNav user={user} />
      <div className={classes.box}>{children}</div>
    </div>
  );
};

export default DashRouter;
