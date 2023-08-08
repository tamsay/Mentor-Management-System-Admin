import { toast } from "react-toastify";
import { AxiosError } from "axios"; // Import AxiosError interface
import { createSlice } from "@reduxjs/toolkit";

import { getAllUserProfilesApi, getProfileApi, updateProfileApi } from "../api/profile";

import { getAllUserProfilesLoading, getProfileLoading, updateProfileLoading } from "@/redux/Loading/LoadingSlice";
import { AppDispatch } from "@/redux/store";

const initialState = {
  error: false,
  getAllUserProfilesData: {},
  updateProfileData: {},
  getProfileData: {}
};

export const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    hasError: (state, action) => {
      state.error = action.payload;
    },

    getAllUserProfilesAction: (state, action) => {
      state.getAllUserProfilesData = action.payload;
    },

    updateProfileAction: (state, action) => {
      state.updateProfileData = action.payload;
    },

    getProfileAction: (state, action) => {
      state.getProfileData = action.payload;
    }
  }
});
export default profileSlice.reducer;

// Actions
const { hasError, getAllUserProfilesAction, updateProfileAction, getProfileAction } = profileSlice.actions;

// Type guard to check if the error is an Axios error
const isAxiosError = (error: any): error is AxiosError => {
  return (error as AxiosError).isAxiosError === true;
};

export const getAllUserProfiles = (data: Record<string, any>) => async (dispatch: AppDispatch) => {
  dispatch(getAllUserProfilesLoading(true));
  try {
    const response = await getAllUserProfilesApi(data);
    dispatch(getAllUserProfilesLoading(false));
    dispatch(getAllUserProfilesAction(response?.data?.data));
    return { success: true };
  } catch (e) {
    toast.error(e?.response?.data?.message);
    dispatch(getAllUserProfilesLoading(false));
    dispatch(hasError(e?.response?.data));
    return { success: false };
  }
};

export const updateProfile = (data: Record<string, any>) => async (dispatch: AppDispatch) => {
  dispatch(updateProfileLoading(true));

  try {
    const response = await updateProfileApi(data);
    dispatch(updateProfileLoading(false));
    dispatch(updateProfileAction(response?.data?.data));
    return { success: true };
  } catch (e) {
    toast.error(e?.response?.data);
    dispatch(updateProfileLoading(false));
    dispatch(hasError(e?.response?.data));
    return { success: false };
  }
};

export const getProfile = () => async (dispatch: AppDispatch) => {
  dispatch(getProfileLoading(true));

  try {
    const response = await getProfileApi();
    dispatch(getProfileLoading(false));
    dispatch(getProfileAction(response?.data?.data));
    return { success: true };
  } catch (error) {
    // toast.error(e?.response?.data);
    // dispatch(getProfileLoading(false));
    // dispatch(hasError(e?.response?.data));
    // return { success: false };

    if (isAxiosError(error)) {
      const axiosError = error as AxiosError; // Type assertion
      if (axiosError.response?.data && typeof axiosError.response.data === "object") {
        const errorMessage = axiosError.response.data?.message;
        if (errorMessage) {
          toast.error(errorMessage);
        }
      }
      dispatch(getProfileLoading(false));
      dispatch(hasError(axiosError));
    } else {
      throw error; // Re-throw the error if it's not an Axios error
    }
    return { success: false };
  }
};
