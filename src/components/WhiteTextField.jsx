import { TextField, styled } from "@mui/material";

const WhiteTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottomColor: "black",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputLabel-filled.Mui-focused": {
    color: "white",
  },
});

export default WhiteTextField;
