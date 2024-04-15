import axios from "axios";
import { getWithExpiry } from "../localStorageHelper";

export const axiosWithToken = axios.create({
  baseURL: `${import.meta.env.VITE_CORPCON_SERVER}`,
});

axiosWithToken.interceptors.request.use(async (config) => {
  const loggedInToken = getWithExpiry("token");
  config["headers"]["authorization"] = `Bearer ${loggedInToken}`;
  return config;
});
