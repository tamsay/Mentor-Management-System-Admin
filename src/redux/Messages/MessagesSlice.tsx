import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createMessageApi, createBroadcastMessageApi, getMessageDetailsApi, getAllMessagesApi } from "../api/messages";

import {
  createMessageLoading,
  createBroadcastMessageLoading,
  getMessageDetailsLoading,
  getAllMessagesLoading
} from "@/redux/Loading/LoadingSlice";

const initialState = {
  error: false,
  createMessageData: {},
  createBroadcastMessageData: {},
  getMessageDetailsData: {},
  getAllMessagesData: {}
};

export const messagesSlice = createSlice({
  name: "messages",

  initialState,

  reducers: {
    hasError: (state, action) => {
      state.error = action.payload;
    },

    createMessageAction: (state, action) => {
      state.createMessageData = action.payload;
    },

    createBroadcastMessageAction: (state, action) => {
      state.createBroadcastMessageData = action.payload;
    },

    getMessageDetailsAction: (state, action) => {
      state.getMessageDetailsData = action.payload;
    },

    getAllMessagesAction: (state, action) => {
      state.getAllMessagesData = action.payload;
    }
  }
});
export default messagesSlice.reducer;

// Actions
const { hasError, createMessageAction, createBroadcastMessageAction, getMessageDetailsAction, getAllMessagesAction } =
  messagesSlice.actions;

export const createMessage = (data) => async (dispatch) => {
  dispatch(createMessageLoading(true));
  try {
    const response = await createMessageApi(data);
    dispatch(createMessageLoading(false));
    dispatch(createMessageAction(response?.data?.data));
    return { success: true };
  } catch (e) {
    toast.error(e?.response?.data?.message);
    dispatch(createMessageLoading(false));
    dispatch(hasError(e?.response?.data));
    return { success: false };
  }
};
export const createBroadcastMessage = (data) => async (dispatch) => {
  dispatch(createBroadcastMessageLoading(true));
  try {
    const response = await createBroadcastMessageApi(data);
    dispatch(createBroadcastMessageLoading(false));
    dispatch(createBroadcastMessageAction(response?.data?.data));
    return { success: true };
  } catch (e) {
    toast.error(e?.response?.data?.message);
    dispatch(createBroadcastMessageLoading(false));
    dispatch(hasError(e?.response?.data));
    return { success: false };
  }
};

export const getMessageDetails = (data) => async (dispatch) => {
  dispatch(getMessageDetailsLoading(true));
  try {
    const response = await getMessageDetailsApi(data);
    dispatch(getMessageDetailsLoading(false));
    dispatch(getMessageDetailsAction(response?.data?.data));
    return { success: true };
  } catch (e) {
    toast.error(e?.response?.data?.message);
    dispatch(hasError(e?.response?.data));
    dispatch(getMessageDetailsLoading(false));
    return { success: false };
  }
};

export const getAllMessages = () => async (dispatch) => {
  dispatch(getAllMessagesLoading(true));
  try {
    const response = await getAllMessagesApi();
    dispatch(getAllMessagesLoading(false));
    dispatch(getAllMessagesAction(response?.data?.data));
    return { success: true };
  } catch (e) {
    toast.error(e?.response?.data?.message);
    dispatch(hasError(e?.response?.data));
    dispatch(getAllMessagesLoading(false));
    return { success: false };
  }
};
