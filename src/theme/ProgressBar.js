// React imports
import React from "react";
// Material-UI imports
import { makeStyles, MobileStepper, Box, Typography } from "@material-ui/core";
// import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: 0,
    flexDirection: "column",
    width: "100%",
    "& .MuiPaper-root": {
      background: "#FFFFFF",
    },
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "auto",
      margin: "1rem auto 3rem auto",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      margin: "1rem auto 3rem auto",
    },
  },
  stepper: {
    width: "100%",
    padding: "0 0 0 0.8rem",
    marginLeft: -5,
    "& .MuiLinearProgress-root": {
      width: "100%",
    },
  },
  backBtn: {
    padding: 0,
    display: "flex",
    textTransform: "none",
    alignContent: "flex-start",
  },
  btnLabel: {
    textAlign: "left",
  },
  actionBox: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    "& p": {
      fontSize: "1.2rem",
    },
    marginLeft: -11,
  },
}));

export default function ProgressBar({ activeStep, userEmail, stepNumber }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MobileStepper
        variant="progress"
        steps={7}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
      />
      <Box className={classes.actionBox}>
        {/* <Button size="small" className={classes.backBtn}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          <Typography className={classes.btnLabel}>Back</Typography>
        </Button> */}
        {window.location.pathname !== `/updateaccount/${userEmail}` ? (
          <Typography>{`${stepNumber} of 6`}</Typography>
        ) : null}
      </Box>
    </Box>
  );
}
