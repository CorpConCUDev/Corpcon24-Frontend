import { Button, Grid, Radio, TextField, styled } from "@mui/material";
import React, { useState } from "react";
import WhiteTextField from "./WhiteTextField";
import WhiteButton from "./WhiteButton";
import { useNavigate } from "react-router-dom";
import WhiteRadio from "./WhiteRadio";

const Wrapper = styled(Grid)`
  /*   div {
    border: 1px solid red;
  } */

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

  .radio-container {
    cursor: pointer;
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

const RegistrationThree = ({
  setSignupStage,
  selectedType,
  setSelectedType,
}) => {
  const [error, setError] = useState(false);

  const handleNext = () => {
    setError(false);
    if (!selectedType) {
      setError(true);
      return;
    }

    setSignupStage(4);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleNext(e);
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
        <Grid container>
          <h3>Join as ?</h3>
        </Grid>
        <br />
        <p> // join us as a speaker or an attendee.</p>
      </Grid>
      <Grid
        item
        container
        md={6}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => setSelectedType("speaker")}
        className="radio-container"
      >
        <Grid item>
          <WhiteRadio
            checked={selectedType === "speaker"}
            onChange={() => setSelectedType("speaker")}
            value="speaker"
          />
        </Grid>
        <Grid item>
          <p>Speaker</p>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={6}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => setSelectedType("attendee")}
        className="radio-container"
      >
        <Grid item>
          <WhiteRadio
            checked={selectedType === "attendee"}
            onChange={() => setSelectedType("attendee")}
            value="attendee"
          />
        </Grid>
        <Grid item>
          <p>Attendee</p>
        </Grid>
      </Grid>
      {error && <p style={{ color: "red" }}>Please select one.</p>}
      <Grid
        item
        container
        justifyContent={"center"}
        className="button-container"
      >
        <WhiteButton
          variant="contained"
          sx={{ height: 30 }}
          onClick={handleNext}
        >
          <p>Next</p>
        </WhiteButton>
      </Grid>
    </Wrapper>
  );
};

export default RegistrationThree;
