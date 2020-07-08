import React, { useEffect, useState } from "react";

import { UPDATE_PROFILE_PICTURE, GET_PROFILE_IMAGES } from "./queries";
import { useQuery, useMutation } from "react-apollo";

import ProfilePicDefault from "../../assets/images/acs_virtual_logo.png";

// Auth0 imports
import { useAuth0 } from "../../config/react-auth0-spa";

// Material-UI imports
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  profilePicture: {
    border: "2px solid white",
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    background: "white",
    "& img": {
      borderRadius: "50%",
      width: "17rem",
      height: "17rem",
      objectFit: "cover",
      background: "white",
    },
    "& .player-tray": {
      overflow: "visible",
    },
    "& .transcription": {
      overflow: "visible",
    },
  },
}));

export default function ProfilePicture({ profilePicture, userName }) {
  const classes = useStyles();
  const { user } = useAuth0();
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
  const { data, error, loading, refetch } = useQuery(GET_PROFILE_IMAGES, {
    variables: {
      userName: userName,
    },
  });
  const usersProfilePicture = data?.profile?.profilePicture;
  useEffect(() => {
    if (profilePicture && profilePicture !== null)
      updateProfilePicture({
        variables: {
          userName: userName,
          profilePicture: profilePicture,
        },
      });
    refetch();
  }, [
    refetch,
    profilePicture,
    usersProfilePicture,
    updateProfilePicture,
    userName,
  ]);

  return (
    <>
      <img
        className={classes.profilePicture}
        src={
          usersProfilePicture === null ||
          usersProfilePicture === undefined ||
          usersProfilePicture === ""
            ? ProfilePicDefault
            : usersProfilePicture
        }
        alt="Profile Picture"
      />
    </>
  );
}
