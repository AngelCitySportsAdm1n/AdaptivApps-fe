// React/Reach Router imports
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { PROFILE_STEP_5 } from "../queries";
// Component imports
import NextButton from "../../../theme/SmallFormButton";
import SaveButton from "../../../theme/LargeFormButton";
import ProgressBar from "../../../theme/ProgressBar";
// Material-UI imports
import {
  makeStyles,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "67.5%",
    "& .MuiInputLabel-root": {
      color: "black",
    },
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
  },
  em: {
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
  spacing: {
    marginTop: "1.6rem",
  },
  checkBoxContainer: {
    display: "flex",
    justifyContent: "space-between",
    // marginBottom: '1rem'
  },
  checkBox: {
    display: "flex",
    alignItems: "center",
  },
  btnBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.5rem",
  },
});

export default function Step4({ updateDemo3 }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(PROFILE_STEP_5, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control } = useForm({
    defaultValues: {
      acsDiscovery:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.acsDiscovery,
      acsOrgSpecificDiscovery:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.acsOrgSpecificDiscovery,
      acsParticipation:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.acsParticipation,
      amplaEmail:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.amplaEmail,
      virtualRide:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.virtualRide,
      virtualRidePlatforms:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.virtualRidePlatforms,
      xBoxGamePass:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.xBoxGamePass,
      gameFamiliarityMinecraft:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.gameFamiliarityMinecraft,
      gameFamiliarityFortnite:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.gameFamiliarityFortnite,
      gameFamiliarityCallofDuty:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile?.gameFamiliarityCallofDuty,
      gameFamiliarityRocketLeague:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile
          ?.gameFamiliarityRocketLeague,
      gameFamiliarityNone:
        currentUserInfo &&
        currentUserInfo?.profile?.demographicProfile
          ?.gameFamiliarityNone,
    },
  });
  // Sets state with current user's profile info
  useEffect(() => {
    if (!loading && !currentUserInfo) setCurrentUserInfo(defaultInfo);
    if (!loading && currentUserInfo) {
      setValue([
        {
          acsDiscovery:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.acsDiscovery,
        },
        {
          acsOrgSpecificDiscovery:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile
              ?.acsOrgSpecificDiscovery,
        },
        {
          acsParticipation:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.acsParticipation,
        },
        {
          amplaEmail:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.amplaEmail,
        },
        {
          virtualRide:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.virtualRide,
        },
        {
          virtualRidePlatforms:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.virtualRidePlatforms,
        },
        {
          xBoxGamePass:
            currentUserInfo &&
            currentUserInfo?.profile?.demographicProfile?.xBoxGamePass,
        },
        {
          gameFamiliarityMinecraft:
          currentUserInfo &&
          currentUserInfo?.profile?.demographicProfile?.gameFamiliarityMinecraft,
        },
        {
          gameFamiliarityFortnite:
          currentUserInfo &&
          currentUserInfo?.profile?.demographicProfile?.gameFamiliarityFortnite,
        },
      ]);
    }
  }, [loading, currentUserInfo, defaultInfo, setValue]);

  // Will update profile and route user to next step in profile wizard
  const onNext = handleSubmit(async data => {
    await updateDemo3({
      variables: {
        email: userEmail,
        acsDiscovery: data.acsDiscovery,
        acsOrgSpecificDiscovery: data.acsOrgSpecificDiscovery,
        acsParticipation: data.acsParticipation,
        amplaEmail: data.amplaEmail,
        virtualRide: data.virtualRide,
        virtualRidePlatforms: data.virtualRidePlatforms,
        xBoxGamePass: data.xBoxGamePass,
        videoGameFamiliarity: data.videoGameFamiliarity,
      },
    });
    // alert("Successfully completed step 5 of account info update!");
    await navigate(`/updateaccount/${userEmail}/step6of6`);
  });

  const onSave = handleSubmit(async data => {
    await updateDemo3({
      variables: {
        email: userEmail,
        acsDiscovery: data.acsDiscovery,
        acsOrgSpecificDiscovery: data.acsOrgSpecificDiscovery,
        acsParticipation: data.acsParticipation,
        amplaEmail: data.amplaEmail,
        virtualRide: data.virtualRide,
        virtualRidePlatforms: data.virtualRidePlatforms,
        xBoxGamePass: data.xBoxGamePass,
        videoGameFamiliarity: data.videoGameFamiliarity,
      },
    });
    // alert("Successfully saved account info!");
    navigate(`/`);
  });

  return (
    <Box className={classes.root}>
      <ProgressBar activeStep={5} stepNumber={5} userEmail={userEmail} />
      <form className={classes.form}>
        <InputLabel htmlFor="acsDiscovery">
          How did you hear about Angel City Sports?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem>
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Community Event">Community Event</MenuItem>
              <MenuItem value="Radio">Radio</MenuItem>
              <MenuItem value="TV">TV</MenuItem>
              <MenuItem value="Website">Website</MenuItem>
              <MenuItem value="Existing Angel City athlete/volunteer">
                Existing Angel City athlete/volunteer
              </MenuItem>
              <MenuItem value="Like-minded organization">
                Like-minded organization
              </MenuItem>
              <MenuItem value="Social Media">Social Media</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          }
          name="acsDiscovery"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel
          htmlFor="acsOrgSpecificDiscovery"
          className={classes.spacing}
        >
          Did you hear about Angel City Sports through any of the following
          organizations or entities?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem>
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="The Hartford">The Hartford</MenuItem>
              <MenuItem value="Adaptive Apps/C-Hear">
                Adaptive Apps/C-Hear
              </MenuItem>
              <MenuItem value="Shannon Fabrics">Shannon Fabrics</MenuItem>
              <MenuItem value="Citi Bank">Citi Bank</MenuItem>
              <MenuItem value="Microsoft">Microsoft</MenuItem>
              <MenuItem value="Capital Group">Capital Group</MenuItem>
              <MenuItem value="IMAX">IMAX</MenuItem>
              <MenuItem value="Hanson Bridgett LLP">
                Hanson Bridgett LLP
              </MenuItem>
              <MenuItem value="Banc of California">Banc of California</MenuItem>
              <MenuItem value="Fillauer">Fillauer</MenuItem>
              <MenuItem value="Michelman and Robinson LLP">
                Michelman and Robinson LLP
              </MenuItem>
              <MenuItem value="Conal Doyle LLP">Conal Doyle LLP</MenuItem>
              <MenuItem value="Shamrock Capital">Shamrock Capital</MenuItem>
              <MenuItem value="PER4MAX">PER4MAX</MenuItem>
              <MenuItem value="Metz & Harrison, LLP">
                Metz & Harrison, LLP
              </MenuItem>
              <MenuItem value="MyGym Foundation">MyGym Foundation</MenuItem>
              <MenuItem value="Broadvoice">Broadvoice</MenuItem>
              <MenuItem value="Global Sports Development">
                Global Sports Development
              </MenuItem>
              <MenuItem value="Triumph Foundaton">Triumph Foundaton</MenuItem>
              <MenuItem value="Move United (formerly DSUSA & ASUSA)">
                Move United (formerly DSUSA & ASUSA)
              </MenuItem>
              <MenuItem value="Wayfinder Family Services (formerly Junior Blind)">
                Wayfinder Family Services (formerly Junior Blind)
              </MenuItem>
              <MenuItem value="Never Say Never">Never Say Never</MenuItem>
              <MenuItem value="Challenged Athletes Foundaton">
                Challenged Athletes Foundaton
              </MenuItem>
              <MenuItem value="Angel City Sports Oregon">
                Angel City Sports Oregon
              </MenuItem>
              <MenuItem value="Abilities Expo">Abilities Expo</MenuItem>
              <MenuItem value="Hanger Clinic">Hanger Clinic</MenuItem>
              <MenuItem value="Hanger Foundation">Hanger Foundation</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          }
          name="acsOrgSpecificDiscovery"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="acsParticipation" className={classes.spacing}>
          Have you participated in Angel City Sports' Clinics? (either in-person
          or virtual)
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem>
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
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
        <InputLabel htmlFor="amplaEmail" className={classes.spacing}>
          Are you interested in emails from Ampla Partners about career
          opportunities for people with physical disabilities?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem>
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="amplaEmail"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel
          htmlFor="virtualRide"
          variant="default"
          className={classes.spacing}
        >
          Are you interested in participating in the Virtual Ride on 8/9/2020?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem>
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          }
          name="virtualRide"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="virtualRidePlatforms" className={classes.spacing}>
          Do you currently have an account with any of the following virtual
          ride platforms?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem>
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Zwift">Zwift</MenuItem>
              <MenuItem value="BKool">BKool</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
              <MenuItem value="None">None</MenuItem>
            </Select>
          }
          name="virtualRidePlatforms"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <InputLabel htmlFor="xBoxGamePass" className={classes.spacing}>
          Do you have an Xbox Game Pass?
        </InputLabel>
        <Controller
          as={
            <Select>
              <MenuItem>
                <em className={classes.em}>Please choose one</em>
              </MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          }
          name="xBoxGamePass"
          type="select"
          variant="outlined"
          control={control}
          defaultValue=""
        />
        <Typography className={classes.spacing}>
          Which of these games are you familiar with? (check all that apply)
        </Typography>
        {/* <Box className={classes.checkBoxContainer}> */}

        <Box className={classes.checkBox}>
          <Controller
            as={<Checkbox />}
            name="gameFamiliarityMinecraft"
            type="checkbox"
            variant="outlined"
            control={control}
            color="primary"
            defaultValue={false}
            value={true}
          />
          <InputLabel htmlFor="gameFamiliarityMinecraft">Minecraft</InputLabel>
        </Box>
        <Box className={classes.checkBox}>
          <Controller
            as={<Checkbox />}
            name="gameFamiliarityFortnite"
            type="checkbox"
            variant="outlined"
            control={control}
            color="primary"
            defaultValue={false}
            value={true}
          />
          <InputLabel htmlFor="gameFamiliarityFortnite">Fortnite</InputLabel>
        </Box>

        <Box className={classes.checkBox}>
          <Controller
            as={<Checkbox />}
            name="gameFamiliarityCallofDuty"
            type="checkbox"
            variant="outlined"
            control={control}
            color="primary"
            defaultValue={false}
            value={true}
          />
          <InputLabel htmlFor="gameFamiliarityCallofDuty">
            Call of Duty
          </InputLabel>
        </Box>
        <Box className={classes.checkBox}>
          <Controller
            as={<Checkbox />}
            name="gameFamiliarityRocketLeague"
            type="checkbox"
            variant="outlined"
            control={control}
            color="primary"
            defaultValue={false}
            value={true}
          />
          <InputLabel htmlFor="gameFamiliarityRocketLeague">
            Rocket League
          </InputLabel>
        </Box>
        <Box className={classes.checkBox}>
          <Controller
            as={<Checkbox />}
            name="gameFamiliarityNone"
            type="checkbox"
            variant="outlined"
            control={control}
            color="primary"
            defaultValue={false}
            value={true}
          />
          <InputLabel htmlFor="gameFamiliarityNone">None</InputLabel>
        </Box>

        {/* </Box> */}
      </form>
      <Box className={classes.btnBox}>
        <SaveButton
          label={"Save & Quit"}
          ariaLabel="Click to save and continue later and return to settings page."
          onClick={onSave}
        />
        <NextButton
          label={"Next"}
          onClick={onNext}
          ariaLabel="Click here to complete step 5 and move onto step 6 of account information update."
        />
      </Box>
    </Box>
  );
}
