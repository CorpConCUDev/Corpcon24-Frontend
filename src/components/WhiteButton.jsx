import { Button, styled } from "@mui/material";

const WhiteButton = styled(Button)({
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  border: "1px solid white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "black",
  },
});

export default WhiteButton;
