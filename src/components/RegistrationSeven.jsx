import React, { useState } from "react";
import { TextField, Button, Grid, styled } from "@mui/material";
import WhiteButton from "./WhiteButton";
import { useMutation } from "react-query";
import { uploadPpt } from "../hooks/mutations/updateMutations";
import { getWithExpiry } from "../utils/localStorageHelper";

const Wrapper = styled(Grid)`
  background: rgba(200, 255, 255, 0.2);
  width: 500px;
  /*  height: 300px; */
  border-radius: 20px;
  padding: 40px;

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

const RegistrationSeven = ({
  setSignupStage,
  setFileName,
  setAlertOpen,
  setMessage,
  setSeverity,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileError, setSelectedFileError] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  let honeyPot = false;
  const setHoneyPot = () => {
    honeyPot = true;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitPpt(e);
    }
  };

  const validateInput = () => {
    setSelectedFileError(false);

    if (!selectedFile) {
      setSelectedFileError(true);

      setAlertOpen(true);
      setMessage("Please upload a file!");
      setSeverity("error");

      return false;
    }

    const fileName = selectedFile.name;
    const blacklistedExtensions = [
      ".exe",
      ".bat",
      ".vbs",
      ".js",
      ".html",
      ".php",
      ".dll",
    ];

    const isBlacklisted = blacklistedExtensions.some((ext) =>
      fileName.toLowerCase().endsWith(ext)
    );

    if (isBlacklisted) {
      setSelectedFileError(true);
      setSelectedFile(null);
      setAlertOpen(true);
      setMessage("This file type is not allowed.");
      setSeverity("error");
      return false;
    }

    return true;
  };

  const { mutate: updateMutate } = useMutation(uploadPpt);

  const handleSubmitPpt = () => {
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

      const formData = new FormData();
      const fileBlob = new Blob([selectedFile], { type: selectedFile.type });
      formData.append("file", fileBlob, selectedFile.name);

      updateMutate(formData, {
        onSuccess: (res) => {
          setButtonDisabled(false);

          setSelectedFile(null);

          setAlertOpen(true);
          setMessage(res.data.message);
          setSeverity("success");

          setFileName(res.data.data);

          setSignupStage(8);
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
          setSelectedFile(null);
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
      });
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

  return (
    <Wrapper
      container
      justifyContent={"center"}
      alignContent={"center"}
      onKeyPress={handleKeyPress}
    >
      <Grid item container>
        <h3>Ready to go? Upload your presentation here</h3>
        <br />
        <p style={{ marginTop: 0 }}> // please ensure file size is under 20 MB</p>
      </Grid>
      <Grid container justifyContent={"center"}>
        <WhiteButton variant="contained" component="label">
          {selectedFile ? "Re-upload File" : "Upload File"}
          <input type="file" hidden onChange={handleFileChange} />
        </WhiteButton>
      </Grid>
      <TextField value="" onChange={setHoneyPot} style={{ display: "none" }} />
      <Grid container justifyContent={"center"}>
        {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      </Grid>

      {selectedFile && (
        <Grid container justifyContent={"center"} style={{ paddingTop: 30 }}>
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
              component="label"
              disabled={!selectedFile}
              onClick={handleSubmitPpt}
            >
              Submit
            </WhiteButton>
          )}
        </Grid>
      )}
    </Wrapper>
  );
};

export default RegistrationSeven;
