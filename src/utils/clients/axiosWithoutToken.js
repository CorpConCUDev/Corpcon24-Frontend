import axios from "axios";

export const axiosWithoutToken = axios.create({
  baseURL: `${import.meta.env.VITE_CORPCON_SERVER}`,
});
