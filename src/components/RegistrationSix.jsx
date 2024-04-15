import { Button, Grid, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import WhiteTextField from "./WhiteTextField";
import WhiteButton from "./WhiteButton";
import { useNavigate } from "react-router-dom";
import { remainingWords } from "../utils/validation";
import { useMutation } from "react-query";
import { updateSpeaker } from "../hooks/mutations/updateMutations";
import { clearLocalStorage, getWithExpiry } from "../utils/localStorageHelper";

const Wrapper = styled(Grid)`
  background: rgba(200, 255, 255, 0.2);
  width: 460px;
  /*  height: 300px; */
  border-radius: 20px;
  padding: 40px;

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
    color: white;
  }

  .button-container {
    margin-top: 20px;

    @media screen and (max-width: 900px) {
      margin-top: 30px;

      .resume-later-button {
        margin-bottom: 20px;
      }
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

const RegistrationSix = ({
  setSignupStage,
  domain,
  setDomain,
  title,
  setTitle,
  abstract,
  setAbstract,
  setAlertOpen,
  setMessage,
  setSeverity,
}) => {
  const [domainError, setDomainError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [abstractError, setAbstractError] = useState(false);
  const [remaining, setRemaining] = useState(0);

  const { mutate: updateSpeakerMutate } = useMutation(updateSpeaker);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const setStateNull = () => {
    setDomain("");
    setTitle("");
    setAbstract("");
    return;
  };

  let honeyPot = false;
  const setHoneyPot = () => {
    honeyPot = true;
  };

  const handleAbstractChange = (abstract) => {
    setRemaining(remainingWords(abstract));
    setAbstract(abstract);
  };

  const handleResumeLater = () => {
    clearLocalStorage();
    setSignupStage(1);
  };

  const validateInput = () => {
    setDomainError(false);
    setTitleError(false);
    setAbstractError(false);

    if (!domain) return setDomainError(true);
    if (!title) return setTitleError(true);
    if (remaining > 0 || remaining < -50) return setAbstractError(true);

    return true;
  };

  const handleSubmit = () => {
    if (honeyPot) {
      console.warn("error b", email);
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
      const payload = {
        domain,
        title,
        abstract,
      };
      updateSpeakerMutate(
        {
          userId,
          payload,
        },
        {
          onSuccess: (res) => {
            setButtonDisabled(false);

            console.log(res.data);
            setStateNull();

            console.log(res.data.message);
            setAlertOpen(true);
            setMessage("Updated successfully. Thanks for registering!");
            setSeverity("success");

            setSignupStage(7);
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
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
      <Grid item container justifyContent={"flex-start"} className="title">
        <h3>About your talk</h3>
      </Grid>
      <Grid item container justifyContent={"flex-start"}>
        <p> // so that we can be prepared.</p>
      </Grid>

      <Grid item container>
        <WhiteTextField
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          label="Domain"
          variant="filled"
          helperText="Domain of your session."
          fullWidth
          error={domainError}
          required
        />
      </Grid>

      <Grid item container>
        <WhiteTextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="filled"
          helperText="Title of your session."
          fullWidth
          error={titleError}
          required
        />
      </Grid>

      <Grid item container>
        <WhiteTextField
          value={abstract}
          onChange={(e) => handleAbstractChange(e.target.value)}
          label="Abstract"
          variant="filled"
          helperText={
            remaining > 0
              ? `${remaining} words remaining.`
              : remaining < -50
              ? `${-remaining} words excess.`
              : "50-100 words that best describe your session."
          }
          fullWidth
          multiline
          rows={5}
          error={abstractError}
          required
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
        justifyContent={"space-around"}
        className="button-container"
      >
        {!buttonDisabled && (
          <WhiteButton
            variant="contained"
            sx={{ height: 30 }}
            onClick={handleResumeLater}
            className="resume-later-button"
            disabled={buttonDisabled}
          >
            <p>Resume Later</p>
          </WhiteButton>
        )}

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
            sx={{ height: 30 }}
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            <p>Finish Registration</p>
          </WhiteButton>
        )}
      </Grid>

      <Grid item container justifyContent={"center"}>
        <p>
          *Note: Finish registration by submitting these details. Sign in later
          with your email to resume, and stay tuned for the final completion
          deadline in your email inbox.
        </p>
      </Grid>
    </Wrapper>
  );
};

export default RegistrationSix;
