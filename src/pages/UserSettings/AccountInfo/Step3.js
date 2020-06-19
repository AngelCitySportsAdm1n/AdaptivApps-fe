// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_3 } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import SaveButton from "../../../theme/LargeFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Box,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "67.5%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
  },
  spacing: {
    marginTop: "2.4rem",
  },
  textBox: {
    marginBottom: "35rem",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function Step3({ updateDemoProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_3, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm();
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            adaptivSportsParticipation:
              currentUserInfo?.profile?.demographicProfile
                ?.adaptivSportsParticipation,
          },
          {
            acsParticipation:
              currentUserInfo?.profile?.demographicProfile?.acsParticipation,
          },
          {
            notParticipating:
              currentUserInfo?.profile?.demographicProfile?.notParticipating,
          },
          {
            angelCityParticipation:
              currentUserInfo?.profile?.demographicProfile
                ?.angelCityParticipation,
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);
  // Will update profile and route user to next step in profile wizard
  const onNext = handleSubmit(async data => {
    await updateDemoProfile({
      variables: {
        email: userEmail,
        adaptivSportsParticipation: data.adaptivSportsParticipation,
        acsParticipation: data.acsParticipation,
        notParticipating: data.notParticipating,
        angelCityParticipation: data.angelCityParticipation,
      },
    });
    alert("Successfully completed step 3 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step4of6`);
  });
  // Will update profile and route user back to settings page allowing user to complete profile wizard at a later time
  const onSave = handleSubmit(async data => {
    await updateDemoProfile({
      variables: {
        email: userEmail,
        adaptivSportsParticipation: data.adaptivSportsParticipation,
        acsParticipation: data.acsParticipation,
        notParticipating: data.notParticipating,
        angelCityParticipation: data.angelCityParticipation,
      },
    });
    alert("Successfully saved account info!");
    navigate(`/`);
  });

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={3} stepNumber={3} userEmail={userEmail} />
      <form className={classes.form}>
        <InputLabel htmlFor="adaptivSportsParticipation">
          Have you ever participated in adaptive sports before?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="adaptivSportsParticipation"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel className={classes.spacing} htmlFor="acsParticipation">
          Have you participated in Angel City Clinics before?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="acsParticipation"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel
          className={classes.spacing}
          htmlFor="angelCityParticipation"
        >
          Please select all Angel City Games you have participated in?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem value="Game 1">Game 1</MenuItem>
              <MenuItem value="Game 2">Game 2</MenuItem>
              <MenuItem value="Game 3">Game 3</MenuItem>
            </Select>
          }
          name="angelCityParticipation"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel className={classes.spacing} htmlFor="notParticipating">
          If you are not participating in as many adaptive sports as you'd like,
          can you please share why?
        </InputLabel>
        <Controller
          as={<TextField />}
          name="notParticipating"
          variant="outlined"
          control={control}
          className={classes.textBox}
          multiline
          rows="8"
          defaultValue=""
        />
        <Box className={classes.btnBox}>
          <SaveButton
            label={"Save & Quit"}
            ariaLabel="Click to save and continue later and return to settings page."
            onClick={onSave}
          />
          <NextButton
            label="Next"
            onClick={onNext}
            ariaLabel="Click here to complete step 3 and move onto step 4 of account information update."
          />
        </Box>
      </form>
    </Box>
  );
}
