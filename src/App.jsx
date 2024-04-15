import { Grid } from "@mui/material";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./containers/LandingPage";
import Layout from "./containers/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={"/"} element={<LandingPage />} />
      </Route>
    </Routes>
  );
};

export default App;
