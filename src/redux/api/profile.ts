import axios from "@/config/axios";

export const getAllUserProfilesApi = async (data: Record<string, any>) =>
  await axios.get("/Profile/get-all-profiles", data);
export const updateProfileApi = async (data: Record<string, any>) => await axios.put("/Profile/update-profile", data);
export const getProfileApi = async () => await axios.get("/Profile/get-profile");
