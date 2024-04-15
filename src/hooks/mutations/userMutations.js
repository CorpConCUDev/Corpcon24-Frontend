import { axiosWithoutToken as axiosInstance } from "../../utils/clients/axiosWithoutToken.js";

export const sendOtp = async (payload) => {
  try {
    const response = await axiosInstance.post("/user/send-otp", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const authenticateOtp = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/user/authenticate-otp",
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (error) {
    throw error.response;
  }
};
