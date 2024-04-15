import {
  Button,
  Grid,
  TextField,
  createTheme,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import WhiteTextField from "./WhiteTextField";
import WhiteButton from "./WhiteButton";
import { validIndianPhoneno, validNumberString } from "../utils/validation";
import { useMutation } from "react-query";
import {
  registerAttendee,
  registerSpeaker,
} from "../hooks/mutations/registerMutate";
import { getWithExpiry } from "../utils/localStorageHelper";

const Wrapper = styled(Grid)`
  background: rgba(200, 255, 255, 0.2);
  width: 460px;
  /*  height: 300px; */
  border-radius: 20px;
  padding: 40px;

  @media screen and (max-width: 900px) {
    padding: 20px;
    width: 540px;
    height: 600px;
  }

  h3 {
    margin: 0px;
    padding: 0px;
    font-weight: 900;
    color: white;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }

  p {
    margin: 0px;
    padding: 0px;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .button-container {
    margin-top: 10px;

    @media screen and (max-width: 900px) {
      margin-top: 30px;
    }
  }

  .loader {
    /* the colors */
    --c1: #15f4ee;
    --c2: #9aff9a;
    --c3: #ffd700;
    --c4: #ff0000;

    /**/
    padding: 5px;
    width: 18px; /* control the size */
    aspect-ratio: 8/5;
    --_g: no-repeat radial-gradient(#000 68%, #0000 71%);
    -webkit-mask: var(--_g), var(--_g), var(--_g);
    -webkit-mask-size: 25% 40%;
    background: conic-gradient(var(--c1) 50%, var(--c2) 0) no-repeat,
      conic-gradient(var(--c3) 50%, var(--c4) 0) no-repeat;
    background-size: 200% 50%;
    animation: back 4s infinite steps(1), load 2s infinite;
  }

  @keyframes load {
    0% {
      -webkit-mask-position: 0% 0%, 50% 0%, 100% 0%;
    }
    16.67% {
      -webkit-mask-position: 0% 100%, 50% 0%, 100% 0%;
    }
    33.33% {
      -webkit-mask-position: 0% 100%, 50% 100%, 100% 0%;
    }
    50% {
      -webkit-mask-position: 0% 100%, 50% 100%, 100% 100%;
    }
    66.67% {
      -webkit-mask-position: 0% 0%, 50% 100%, 100% 100%;
    }
    83.33% {
      -webkit-mask-position: 0% 0%, 50% 0%, 100% 100%;
    }
    100% {
      -webkit-mask-position: 0% 0%, 50% 0%, 100% 0%;
    }
  }
  @keyframes back {
    0%,
    100% {
      background-position: 0% 0%, 0% 100%;
    }
    25% {
      background-position: 100% 0%, 0% 100%;
    }
    50% {
      background-position: 100% 0%, 100% 100%;
    }
    75% {
      background-position: 0% 0%, 100% 100%;
    }
  }
`;

const RegistrationFour = ({
  setSignupStage,
  selectedType,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  designation,
  setDesignation,
  company,
  setCompany,
  yoe,
  setYoe,
  setAlertOpen,
  setMessage,
  setSeverity,
}) => {
  const [nameError, setNameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [invalidNumberError, setInvalidNumberError] = useState(false);
  const [yoeError, setYoeError] = useState(false);

  const { mutate: registerSpeakerMutate } = useMutation(registerSpeaker);
  const { mutate: registerAttendeeMutate } = useMutation(registerAttendee);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const setStateNull = () => {
    setName("");
    setPhoneNumber("");
    setDesignation("");
    setCompany("");
    setYoe("");
    return;
  };

  const validateInput = () => {
    setNameError(false);
    setPhoneNumberError(false);
    setInvalidNumberError(false);
    setCompanyError(false);
    setYoeError(false);
    if (!name) return setNameError(true);
    if (!phoneNumber) return setPhoneNumberError(true);
    if (!validIndianPhoneno(phoneNumber)) return setInvalidNumberError(true);
    if (!company) return setCompanyError(true);
    if (yoe && !validNumberString(yoe)) return setYoeError(true);

    return true;
  };

  let honeyPot = false;
  const setHoneyPot = () => {
    honeyPot = true;
  };

  const handleSubmitAttendee = () => {
    if (honeyPot) {
      console.warn("error b", email);
      return;
    }
    if (!validateInput()) return;

    const userId = getWithExpiry("userId");
    if (!userId) {
      setSignupStage(1);
      // set up snackbar alert also
    }
    try {
      setButtonDisabled(true);
      registerAttendeeMutate(
        {
          userId: userId,
          name: name,
          phoneNumber: phoneNumber,
          designation: designation,
          organisation: company,
          yearsOfExperience: yoe,
        },
        {
          onSuccess: (res) => {
            setButtonDisabled(false);

            setStateNull();

            setAlertOpen(true);
            setMessage(res.data.message);
            setSeverity("success");

            setSignupStage(5);
            // thanks or something
          },
          onError: (error) => {
            setButtonDisabled(false);

            if (!error) {
              console.log("Server unreachable");
              setAlertOpen(true);
              setMessage("Server unreachable");
              setSeverity("error");
            }
            setStateNull();
            console.log(error);
            setAlertOpen(true);
            setMessage("Error while registering");
            setSeverity("error");

            if (
              error.data.message ===
              "Register speaker failed: user doesn't exist."
            ) {
              setSignupStage(1);
              return;
            }
          },
        }
      );
    } catch (error) {
      setButtonDisabled(false);

      console.error("Error during user registration:", error);
      setStateNull();

      if (error.response) {
        setAlertOpen(true);
        setMessage(
          error.response.data.message || "An error occurred while registering"
        );
        setSeverity("error");
      } else if (error.request) {
        console.error("Server did not respond");
        setAlertOpen(true);
        setMessage("Server did not respond");
        setSeverity("error");
      } else {
        console.error("Error setting up the request:", error.message);
        setAlertOpen(true);
        setMessage("An unexpected error occurred");
        setSeverity("error");
      }
    }
  };

  const handleSubmitSpeaker = () => {
    if (honeyPot) {
      console.warn("bot alert!", email);
      return;
    }
    if (!validateInput()) {
      return;
    }

    const userId = getWithExpiry("userId");
    if (!userId) {
      setSignupStage(1);
      setAlertOpen(true);
      setMessage("An error occured. Please sign in again.");
      setSeverity("error");
      return;
    }

    try {
      setButtonDisabled(true);

      registerSpeakerMutate(
        {
          userId: userId,
          name: name,
          phoneNumber: phoneNumber,
          designation: designation,
          organisation: company,
          yearsOfExperience: yoe,
        },
        {
          onSuccess: (res) => {
            setButtonDisabled(false);

            console.log(res.data);
            setStateNull();

            console.log(res.data.message);
            setAlertOpen(true);
            setMessage("Initial registration successful!");
            setSeverity("success");

            setSignupStage(6);
            // thanks or something
          },
          onError: (error) => {
            setButtonDisabled(false);

            if (!error) {
              console.log("Server unreachable");
              setAlertOpen(true);
              setMessage("Server unreachable");
              setSeverity("error");
            }
            setStateNull();
            console.log(error);
            setAlertOpen(true);
            setMessage("Error while registering");
            setSeverity("error");

            if (
              error.data.message ===
              "Register attendee failed: user doesn't exist."
            ) {
              setSignupStage(1);
              return;
            }
          },
        }
      );
    } catch (error) {
      setButtonDisabled(false);

      console.error("Error during user registration:", error);
      setStateNull();

      if (error.response) {
        setAlertOpen(true);
        setMessage(
          error.response.data.message || "An error occurred while registering"
        );
        setSeverity("error");
      } else if (error.request) {
        console.error("Server did not respond");
        setAlertOpen(true);
        setMessage("Server did not respond");
        setSeverity("error");
      } else {
        console.error("Error setting up the request:", error.message);
        setAlertOpen(true);
        setMessage("An unexpected error occurred");
        setSeverity("error");
      }
    }
  };

  const theme = useTheme();
  const customTheme = createTheme({
    breakpoints: {
      values: {
        breakpoint1: 1300,
        breakpoint2: 900,

        ...theme.breakpoints.values,
      },
    },
  });

  const isBreakpoint1 = useMediaQuery(
    customTheme.breakpoints.down("breakpoint1")
  );
  const isBreakpoint2 = useMediaQuery(
    customTheme.breakpoints.down("breakpoint2")
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = () => {
    selectedType === "speaker" ? handleSubmitSpeaker() : handleSubmitAttendee();
  };

  return (
    <Wrapper
      container
      justifyContent={"center"}
      alignContent={"center"}
      rowGap={2}
      onKeyPress={handleKeyPress}
    >
      <Grid item container justifyContent={"flex-start"} className="title">
        <h3>Your details</h3>
      </Grid>
      <Grid item container justifyContent={"flex-start"}>
        <p> // tell us a bit about you!</p>
      </Grid>

      <Grid item container>
        <WhiteTextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="filled"
          fullWidth
          error={nameError}
          helperText={nameError ? "Name cannot be empty." : ""}
          required
        />
      </Grid>

      <Grid item container>
        <WhiteTextField
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone number"
          variant="filled"
          fullWidth
          error={phoneNumberError || invalidNumberError}
          helperText={
            phoneNumberError
              ? "Phone number cannot be empty."
              : invalidNumberError && "Enter valid phone number."
          }
          required
        />
      </Grid>

      {!isBreakpoint2 ? (
        <Grid container columnSpacing={2}>
          <Grid item container md={6}>
            <WhiteTextField
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              label="Designation"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item container md={6}>
            <WhiteTextField
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              label="Company"
              variant="filled"
              fullWidth
              error={companyError}
              helperText={companyError ? "Company cannot be empty." : ""}
              required
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <Grid item container>
            <WhiteTextField
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              label="Designation"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item container>
            <WhiteTextField
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              label="Company"
              variant="filled"
              fullWidth
              error={companyError}
              helperText={companyError ? "Company cannot be empty." : ""}
              required
            />
          </Grid>
        </>
      )}

      <Grid item container md={6}>
        <WhiteTextField
          value={yoe}
          onChange={(e) => setYoe(e.target.value)}
          label="Years of experience"
          variant="filled"
          fullWidth
          error={yoeError}
          helperText={yoeError && "Years in numbers."}
        />
        <TextField
          value=""
          onChange={setHoneyPot}
          style={{ display: "none" }}
        />
      </Grid>

      <Grid item container justifyContent={"center"}>
        {buttonDisabled ? (
          <Grid
            item
            container
            justifyContent={"center"}
            className="please-wait"
          >
            <div className="loader"></div>
          </Grid>
        ) : (
          <WhiteButton
            variant="contained"
            onClick={handleSubmit}
            sx={{ height: 30 }}
            className="button-container"
            disabled={buttonDisabled}
          >
            <p>
              {selectedType === "speaker"
                ? "Register & save progress"
                : "Register as attendee"}
            </p>
          </WhiteButton>
        )}
      </Grid>
    </Wrapper>
  );
};

export default RegistrationFour;
