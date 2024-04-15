import { axiosWithToken as axiosInstance } from "../../utils/clients/axiosWithToken.js";

export const updateSpeaker = async ({ userId, payload }) => {
  try {
    const response = await axiosInstance.patch(
      `/update/update-speaker/${userId}`,
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

export const uploadPpt = async (payload) => {
  try {
    const response = await axiosInstance.post(`/update/upload-ppt`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};
