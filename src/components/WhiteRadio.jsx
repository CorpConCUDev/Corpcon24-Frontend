import { Radio, styled } from "@mui/material";

const WhiteRadio = styled(Radio)(({ theme }) => ({
  color: "white",
  "&.Mui-checked": {
    color: "white",
  },
}));

export default WhiteRadio;
