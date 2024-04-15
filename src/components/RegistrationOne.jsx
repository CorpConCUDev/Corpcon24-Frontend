import { Button, Grid, TextField, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import WhiteTextField from "./WhiteTextField";
import WhiteButton from "./WhiteButton";
import { useNavigate } from "react-router-dom";
import { validEmail } from "../utils/validation";
import { useMutation } from "react-query";
import { sendOtp } from "../hooks/mutations/userMutations";
import {
  clearLocalStorage,
  getWithExpiry,
  setWithExpiry,
} from "../utils/localStorageHelper";

const Wrapper = styled(Grid)`
  background: rgba(200, 255, 255, 0.2);
  width: 460px;
  height: 300px;
  border-radius: 20px;
  padding: 40px;

  @media screen and (max-width: 900px) {
    padding: 20px;
    width: 540px;
    height: 350px;
  }

  h3 {
    margin: 0px;
    margin-bottom: 10px;
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
      margin-top: 20px;
    }
  }

  .please-wait {
    padding-top: 10px;
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

const RegistrationOne = ({
  setSignupStage,
  email,
  setEmail,
  setSelectedType,
  setName,
  setPhoneNumber,
  setDesignation,
  setCompany,
  setYoe,
  setDomain,
  setTitle,
  setAbstract,
  setAlertOpen,
  setMessage,
  setSeverity,
}) => {
  const setStateNull = () => {
    setEmail("");
    setSelectedType(null);
    setName("");
    setPhoneNumber("");
    setDesignation("");
    setCompany("");
    setYoe("");
    setDomain("");
    setTitle("");
    setAbstract("");
    return;
  };

  useEffect(() => {
    clearLocalStorage();
    setStateNull();
  }, []);

  const [emailNullError, setEmailNullError] = useState(false);
  const [emailInvalidError, setEmailInvalidError] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { mutate: sendOtpMutate } = useMutation(sendOtp);

  let honeyPot = false;
  const setHoneyPot = () => {
    honeyPot = true;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendOtp(e);
    }
  };

  const handleSendOtp = () => {
    if (honeyPot) {
      console.warn("error b", email);
      return;
    }

    setEmailNullError(false);
    setEmailInvalidError(false);
    if (!email) {
      setEmailNullError(true);
      return;
    }
    if (!validEmail(email)) {
      setEmailInvalidError(true);
      return;
    }

    const attempt = getWithExpiry("attempt") ? getWithExpiry("attempt") : 0;

    if (attempt > 3) {
      setAlertOpen(true);
      setMessage("Generate otp failed: retry later.");
      setSeverity("error");
      return;
    }

    try {
      setButtonDisabled(true);
      sendOtpMutate(
        {
          email: email,
          attempt: attempt,
        },
        {
          onSuccess: (res) => {
            setAlertOpen(true);
            setMessage(res.data.message);
            setSeverity("success");
            setButtonDisabled(false);
            setWithExpiry("attempt", 1, 3 * 60 * 60 * 1000);
            setSignupStage(2);
          },
          onError: (error) => {
            if (!error) {
              setAlertOpen(true);
              setMessage("Server unreachable");
              setSeverity("error");
              setButtonDisabled(false);
            }
            console.log(error);
            setAlertOpen(true);
            if (
              error.data.message ===
              "Generate otp failed: maximum attempts reached. please try again in 3 hours."
            ) {
              setMessage(
                "Maximum attempts reached. Please try again in 3 hours."
              );
            } else {
              setMessage("Error sending OTP via email");
            }

            setSeverity("error");
            setButtonDisabled(false);
          },
        }
      );
    } catch (error) {
      console.error("Error during user registration:", error);

      if (error.response) {
        setAlertOpen(true);
        setMessage(
          error.response.data.message || "An error occurred while sending otp"
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
      setButtonDisabled(false);
    }
  };

  return (
    <Wrapper
      container
      justifyContent={"center"}
      alignContent={"center"}
      rowGap={2}
      onKeyPress={handleKeyPress}
    >
      <Grid item container>
        <h3>Register as a speaker or attendee !</h3>
        <br />
        <p> // you can resume your registration at any time, right here.</p>
      </Grid>
      <Grid item container>
        <WhiteTextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="filled"
          fullWidth
          error={emailInvalidError || emailNullError}
          helperText={
            emailNullError
              ? "Please enter email"
              : emailInvalidError && "Please enter valid email"
          }
        />
        <TextField
          value=""
          onChange={setHoneyPot}
          style={{ display: "none" }}
        />
      </Grid>
      <Grid
        item
        container
        justifyContent={"center"}
        className="button-container"
      >
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
            disabled={buttonDisabled}
            onClick={handleSendOtp}
          >
            <p>Send OTP</p>
          </WhiteButton>
        )}
      </Grid>
    </Wrapper>
  );
};

export default RegistrationOne;
