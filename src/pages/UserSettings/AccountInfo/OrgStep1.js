import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "@reach/router";
// Apollo/GraphQL imports
import { useQuery } from "react-apollo";
import { ORG_PROFILE } from "../queries";
// Component imports
import FinishButton from "../../../theme/SmallFormButton";
// Material-UI imports
import {
  makeStyles,
  Typography,
  Box,
  InputLabel,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "67.5%",
    "& .MuiInputLabel-root": {
      color: "black",
    },
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: "74.4rem",
      height: "4.8rem",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    "& .MuiInputLabel-asterisk": {
      fontSize: "2rem",
      color: "red",
      fontWeight: "bolder",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  nameBox: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: "36rem",
      height: "4.8rem",
    },
  },
  firstInput: {
    marginRight: "2.4rem",
  },
  boxSpacing: {
    margin: "1.2rem 0",
  },
  addressBox: {
    display: "flex",
    marginBottom: "2.4rem",
    "& .MuiTextField-root": {
      width: "36rem",
      height: "4.8rem",
    },
  },
  address1: {
    marginRight: "2.4rem",
    marginTop: ".5rem",
  },
  address2: {
    marginTop: ".9rem",
  },
  typeSelect: {
    width: "74.4rem",
    height: "4.8rem",
  },
  bioBox: {
    marginTop: "1.6rem",
    marginBottom: "14rem",
  },
  btnBox: {
    marginTop: "3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: "1.75rem",
    fontVariant: "all-small-caps",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  a11yLink: {
    display: "flex",
    alignSelf: "flex-end",
    fontSize: "1.4rem",
    color: "#2962FF",
    textDecoration: "underline",
  },
}));

export default function OrgStep1({ updateOrgProfile }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userEmail } = useParams();
  const { data: defaultInfo, loading } = useQuery(ORG_PROFILE, {
    variables: { email: userEmail },
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(defaultInfo);
  const { handleSubmit, setValue, control, errors } = useForm({
    defaultValues: {
      phoneNumber: currentUserInfo && currentUserInfo?.profile?.phoneNumber,
      userName: currentUserInfo && currentUserInfo?.profile?.userName,
      instagram: currentUserInfo && currentUserInfo?.profile?.instagram,
      facebook: currentUserInfo && currentUserInfo?.profile?.facebook,
      twitter: currentUserInfo && currentUserInfo?.profile?.twitter,
      bio: currentUserInfo && currentUserInfo?.profile?.bio,
      orgName: currentUserInfo && currentUserInfo?.profile?.extProfile?.orgName,
      website: currentUserInfo && currentUserInfo?.profile?.extProfile?.website,
    },
  });
  // Sets default values in input fields with current user's info
  useEffect(() => {
    !loading && !currentUserInfo
      ? setCurrentUserInfo(defaultInfo)
      : setValue([
          {
            phoneNumber:
              currentUserInfo && currentUserInfo?.profile?.phoneNumber,
          },
          { userName: currentUserInfo && currentUserInfo?.profile?.userName },
          { instagram: currentUserInfo && currentUserInfo?.profile?.instagram },
          { facebook: currentUserInfo && currentUserInfo?.profile?.facebook },
          { twitter: currentUserInfo && currentUserInfo?.profile?.twitter },
          { bio: currentUserInfo && currentUserInfo?.profile?.bio },
          {
            orgName:
              currentUserInfo && currentUserInfo?.profile?.extProfile?.orgName,
          },
          {
            website:
              currentUserInfo && currentUserInfo?.profile?.extProfile?.website,
          },
        ]);
  }, [loading, currentUserInfo, defaultInfo, setValue]);

  const onSubmit = async data => {
    await updateOrgProfile({
      variables: {
        email: userEmail,
        phoneNumber: data.phoneNumber,
        twitter: data.twitter,
        facebook: data.facebook,
        instagram: data.instagram,
        bio: data.bio,
        userName: data.orgName.trim(),
        orgName: data.orgName,
        website: data.website,
      },
    });

    // alert("Successfully updated organization account information!");
    await navigate(`/settings`);
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.boxSpacing}>
        <InputLabel required for="orgName">
          Organization Name
        </InputLabel>
        <Controller
          id="orgName"
          autoComplete="organization name"
          aria-invalid={errors.orgName ? "true" : "false"}
          as={<TextField />}
          name="orgName"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.orgName && (
          <Typography className={classes.error} role="alert">
            organization name is a required field
          </Typography>
        )}
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel required for="website">
          Organization Website
        </InputLabel>
        <Controller
          id="website"
          autoComplete="website"
          aria-invalid={errors.website ? "true" : "false"}
          as={<TextField />}
          name="website"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.website && (
          <Typography className={classes.error} role="alert">
            organization website is a required field
          </Typography>
        )}
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel for="phoneNumber">
          Please enter your phone number
        </InputLabel>
        <Controller
          id="phoneNumber"
          autoComplete="phone number"
          as={<TextField />}
          name="phoneNumber"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      {/* <Box className={classes.addressBox}>
        <Box className={classes.address1}>
          <InputLabel required for="address1">Address 1</InputLabel>
          <Controller
            as={<TextField />}
            name="address1"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
          />
           {errors.address1 && <Typography className={classes.error}>address1 is a required field</Typography>}
        </Box>
        <Box className={classes.address2}>
          <InputLabel for="address2">Address 2</InputLabel>
          <Controller
            as={<TextField />}
            name="address2"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
      </Box> */}

      {/* <Box className={classes.addressBox}>
        <Box className={classes.firstInput}>
          <InputLabel required for="city">City</InputLabel>
          <Controller
            as={<TextField />}
            name="city"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.city && <Typography className={classes.error}>city is a required field</Typography>}
        </Box>
        <Box>
          <InputLabel required for="state">State</InputLabel>
          <Controller
            as={<TextField />}
            name="state"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
            rules={{ required: true }}
          />
          {errors.state && <Typography className={classes.error}>state is a required field</Typography>}
        </Box>
      </Box>
      <Box className={classes.addressBox}>
        <Box className={classes.firstInput}>
          <InputLabel required for="postalCode">Postal Code</InputLabel>
          <Controller
            as={<TextField />}
            name="postalCode"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
          />
           {errors.postalCode && <Typography className={classes.error}>postal code is a required field</Typography>}
        </Box>
       
      </Box> */}
      <Box className={classes.boxSpacing}>
        <InputLabel for="twitter">
          Please enter the full url link to your Twitter profile
        </InputLabel>
        <Controller
          as={<TextField />}
          id="twitter"
          autoComplete="twitter"
          name="twitter"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel for="facebook">
          Please enter the full url link to your Facebook profile
        </InputLabel>
        <Controller
          as={<TextField />}
          id="facebook"
          autoComplete="facebook"
          name="facebook"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel for="instagram">
          Please enter the full url link to your Instagram profile
        </InputLabel>
        <Controller
          as={<TextField />}
          id="instagram"
          autoComplete="instagram"
          name="instagram"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.bioBox}>
        <InputLabel className={classes.inputLabel} for="bio">
          Tell us about your organization
        </InputLabel>
        <Controller
          as={<TextField />}
          id="bio"
          autoComplete="bio"
          name="bio"
          type="text"
          variant="outlined"
          multiline
          rows="8"
          control={control}
          defaultValue=""
        />
      </Box>
      <Typography className={classes.error}>* required field</Typography>
      <Box className={classes.btnBox}>
        <Link to="/privacy-policy" className={classes.a11yLink}>
          Privacy Policy
        </Link>
        <FinishButton
          label="Finish"
          type="submit"
          onClick={handleSubmit}
          ariaLabel="Click here to finish updating your organization information and go back to account settings."
        />
      </Box>
    </form>
  );
}
