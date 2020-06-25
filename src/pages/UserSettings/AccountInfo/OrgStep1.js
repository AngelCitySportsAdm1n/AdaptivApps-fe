import React, { useEffect, useState } from "react";
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

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 744,
      height: 48,
    },
    "& .MuiInputLabel-asterisk": {
      fontSize: '2rem',
      color: 'red',
      fontWeight: 'bolder'
    },
  },
  nameBox: {
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: 360,
      height: 48,
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
      width: 360,
      height: 48,
    },
  },
  typeSelect: {
    width: 744,
    height: 48,
  },
  bioBox: {
    marginBottom: "15rem",
  },
  btnBox: {
    marginTop: '3rem',
    maxWidth: '90%',
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  error: {
    color: 'red',
    fontSize: '1.75rem',    
    fontVariant: 'all-small-caps',
    fontWeight: 'bold',
    marginTop: '1rem'
  }
});

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
      address1: currentUserInfo && currentUserInfo?.profile?.address1,
      address2: currentUserInfo && currentUserInfo?.profile?.address2,
      city: currentUserInfo && currentUserInfo?.profile?.city,
      state: currentUserInfo && currentUserInfo?.profile?.state,
      postalCode: currentUserInfo && currentUserInfo?.profile?.postalCode,
      country: currentUserInfo && currentUserInfo?.profile?.country,
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
          { address1: currentUserInfo && currentUserInfo?.profile?.address1 },
          { address2: currentUserInfo && currentUserInfo?.profile?.address2 },
          { city: currentUserInfo && currentUserInfo?.profile?.city },
          { state: currentUserInfo && currentUserInfo?.profile?.state },
          {
            postalCode: currentUserInfo && currentUserInfo?.profile?.postalCode,
          },
          { country: currentUserInfo && currentUserInfo?.profile?.country },
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
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
        bio: data.bio,
        userName: data.orgName,
        orgName: data.orgName,
        website: data.website,
      },
    });

    alert("Successfully updated organization account information!");
    await navigate(`/`);
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.boxSpacing}>
        <InputLabel required htmlFor="orgName">Organization Name</InputLabel>
        <Controller
          as={<TextField />}
          name="orgName"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.orgName && <Typography className={classes.error}>organization name is a required field</Typography>}
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel required htmlFor="website">Organization Website</InputLabel>
        <Controller
          as={<TextField />}
          name="website"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
        {errors.website && <Typography className={classes.error}>organization website is a required field</Typography>}
      </Box>
      <Box className={classes.boxSpacing}>
        <InputLabel htmlFor="phoneNumber">
          Please enter your phone number
        </InputLabel>
        <Controller
          as={<TextField />}
          name="phoneNumber"
          type="text"
          variant="outlined"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.addressBox}>
        <Box className={classes.firstInput}>
          <InputLabel htmlFor="address1">Address 1*</InputLabel>
          <Controller
            as={<TextField />}
            name="address1"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
        <Box>
          <InputLabel htmlFor="address2">Address 2*</InputLabel>
          <Controller
            as={<TextField />}
            name="address2"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
      </Box>

      <Box className={classes.addressBox}>
        <Box className={classes.firstInput}>
          <InputLabel htmlFor="city">City*</InputLabel>
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
          <InputLabel required htmlFor="state">State</InputLabel>
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
          <InputLabel htmlFor="postalCode">Postal Code*</InputLabel>
          <Controller
            as={<TextField />}
            name="postalCode"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
        <Box>
          <InputLabel htmlFor="country">Country*</InputLabel>
          <Controller
            as={<TextField />}
            name="country"
            type="text"
            variant="outlined"
            control={control}
            defaultValue=""
          />
        </Box>
      </Box>
      <Box className={classes.bioBox}>
        <InputLabel className={classes.inputLabel} htmlFor="bio">
          Tell us about your organization
        </InputLabel>
        <Controller
          as={<TextField />}
          name="bio"
          type="text"
          variant="outlined"
          multiline
          rows="8"
          control={control}
          defaultValue=""
        />
      </Box>
      <Box className={classes.btnBox}>
      <Typography className={classes.error}>* required field</Typography>
        <FinishButton
          label="Finish"
          type="submit"
          onClick={handleSubmit}
          ariaLabel="Click here to finish updating your organization information."
        />
      </Box>
    </form>
  );
}
