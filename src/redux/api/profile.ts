import axios from "@/config/axios";

export const getAllUserProfilesApi = async () => await axios.get("/Profile/get-all-profiles");
export const updateProfileApi = async (data: Record<string, any>) => await axios.put("/Profile/update-profile", data);
export const getProfileApi = async () => await axios.get("/Profile/get-profile");
