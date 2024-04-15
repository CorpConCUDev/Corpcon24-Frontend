import { Button, Grid, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import WhiteTextField from "./WhiteTextField";
import WhiteButton from "./WhiteButton";
import { validOTP } from "../utils/validation";
import { useMutation } from "react-query";
import { authenticateOtp } from "../hooks/mutations/userMutations";
import { getWithExpiry, setWithExpiry } from "../utils/localStorageHelper";

const Wrapper = styled(Grid)`
  background: rgba(200, 255, 255, 0.2);
  width: 460px;
  height: 300px;
  border-radius: 20px;
  padding: 40px;

  @media screen and (max-width: 900px) {
    padding: 20px;
    width: 540px;
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

const RegistrationTwo = ({
  setSignupStage,
  email,
  setEmail,
  setAlertOpen,
  setMessage,
  setSeverity,
}) => {
  const [otp, setOtp] = useState("");
  const [otpNullError, setOtpNullError] = useState(false);
  const [otpInvalidError, setOtpInvalidError] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { mutate: authenticateOtpMutate } = useMutation(authenticateOtp);

  let honeyPot = false;
  const setHoneyPot = () => {
    honeyPot = true;
  };

  const handleVerifyOtp = () => {
    if (honeyPot) {
      console.warn("error b", email);
      return;
    }

    setOtpNullError(false);
    setOtpInvalidError(false);
    if (!email) {
      setSignupStage(1);
    }
    if (!otp) {
      setOtpNullError(true);
      return;
    }
    if (!validOTP(otp)) {
      setOtpInvalidError(true);
      return;
    }

    const attempt = getWithExpiry("attempt") ? getWithExpiry("attempt") : 0;
    setWithExpiry("attempt", attempt + 1, 3 * 60 * 60 * 1000);

    if (attempt > 3) {
      setAlertOpen(true);
      setMessage("Generate otp failed: retry later.");
      setSeverity("error");
      return;
    }

    try {
      setButtonDisabled(true);
      authenticateOtpMutate(
        {
          email: email,
          otp: otp,
          attempt: attempt,
        },
        {
          onSuccess: (res) => {
            setButtonDisabled(false);

            const data = res.data;

            const userId = data.user.userId;
            const email = data.user.email;
            const token = data.user.token;
            const userType = data.user.userType;

            setWithExpiry("userId", userId, 60 * 60 * 1000);
            setWithExpiry("email", email, 60 * 60 * 1000);
            setWithExpiry("token", token, 60 * 60 * 1000);
            setWithExpiry("userType", userType, 60 * 60 * 1000);
            setWithExpiry("attempt", 1, 3 * 60 * 60 * 1000);

            if (userType === "UNREGISTERED") {
              setSignupStage(3);
            } else if (userType === "SPEAKER_INCOMPLETE") {
              setSignupStage(6);
            } else if (userType === "ATTENDEE") {
              setSignupStage(5);
            } else if (userType === "SPEAKER_COMPLETE") {
              setSignupStage(7);
            } else if (userType === "SPEAKER_PPT_UPLOADED") {
              setSignupStage(5);
            }

            setEmail("");
          },
          onError: (error) => {
            setButtonDisabled(false);

            if (!error) {
              console.log("Server unreachable");
              setAlertOpen(true);
              setMessage("Server unreachable");
              setSeverity("error");
            }
            console.log(error);
            setAlertOpen(true);
            setMessage(error.data.message);
            setSeverity("error");
            if (
              error.data.message === "Authenticate otp failed: otp has expired."
            ) {
              setSignupStage(1);
              return;
            }
            if (
              error.data.message &&
              error.data.message === "Authenticate otp failed: retry later."
            ) {
              setSignupStage(1);
              return;
            }
          },
        }
      );
    } catch (error) {
      console.error("Error during user authenticating:", error);
      setButtonDisabled(false);

      if (error.response) {
        setAlertOpen(true);
        setMessage(
          error.response.data.message ||
            "An error occurred while authenticating"
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleVerifyOtp(e);
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
      <Grid item container justifyContent={"flex-start"}>
        <Grid item container md={12}>
          <h3>Enter OTP</h3>
        </Grid>
        <Grid item md={12}>
          <p> // OTP has been sent to {email}</p>
        </Grid>
      </Grid>
      <Grid item container>
        <WhiteTextField
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          label="OTP"
          variant="filled"
          fullWidth
          error={otpNullError || otpInvalidError}
          helperText={
            otpNullError
              ? "Please enter OTP"
              : otpInvalidError && "Please enter 4 digit numberic OTP"
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
            onClick={handleVerifyOtp}
            disabled={buttonDisabled}
          >
            <p>Verify OTP</p>
          </WhiteButton>
        )}
      </Grid>
    </Wrapper>
  );
};

export default RegistrationTwo;
