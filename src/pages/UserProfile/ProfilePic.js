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
    background: "#282C4E",
    "& img": {
      borderRadius: "50%",
      width: "17rem",
      height: "17rem",
      objectFit: "cover",
      background: "#282C4E",
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
  const [currentCHIF, setCurrentCHIF] = useState(null);
  const [render, setRender] = useState(false);
  const [chifDomEl, setCHIFDOMEL] = useState(false);
  const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
  const { data, error, loading, refetch } = useQuery(GET_PROFILE_IMAGES, {
    variables: {
      userName: userName,
      fetchPolicy: "cache-and-network",
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

  useEffect(() => {
    const CHIF = async () => {
      try {
        await window.chifPlayer.streamFiles(
          usersProfilePicture && usersProfilePicture
        );
        setRender(false);
      } catch (error) {
        console.log("try catch CHIF() error", error);
      }
    };
    if (render === true) {
      console.log("Chif Function");
      CHIF();
    }
  }, [render]);

  useEffect(() => {
    const SETRENDER = async () => {
      await setCurrentCHIF(profilePicture);
      await setCHIFDOMEL(false);
      await setCHIFDOMEL(true);
      await setRender(true);
    };
    if (
      profilePicture !== null &&
      (currentCHIF !== profilePicture || currentCHIF === null)
    ) {
      console.log("SetRender");
      SETRENDER();
    }
  }, [profilePicture, currentCHIF]);
  console.log("profile picture", profilePicture);
  console.log("current chif", currentCHIF);
  return (
    <>
      {/* {usersProfilePicture?.includes(".jpg") ||
      usersProfilePicture?.includes(".jpeg") ||
      usersProfilePicture?.includes(".png") ||
      usersProfilePicture?.includes(".svg") ||
      usersProfilePicture === null ||
      usersProfilePicture === undefined ||
      usersProfilePicture === "" ||
      usersProfilePicture === " " ? (
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
      ) : null} */}
      {chifDomEl ? (
        <chear
          className={classes.profilePicture}
          src={usersProfilePicture}
          alt="Profile"
        />
      ) : null}
    </>
  );
}
