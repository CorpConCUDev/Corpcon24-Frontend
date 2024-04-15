import { axiosWithToken as axiosInstance } from "../../utils/clients/axiosWithToken.js";

export const registerSpeaker = async (payload) => {
  try {
    const response = await axiosInstance.post(`/register/speaker`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const registerAttendee = async (payload) => {
  try {
    const response = await axiosInstance.post(`/register/attendee`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
