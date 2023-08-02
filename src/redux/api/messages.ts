import axios from "@/config/axios";

export const createMessageApi = async (data) => await axios.post("/Message/create-message", data);
export const createBroadcastMessageApi = async (data) => await axios.post("/Message/broadcast-message", data);
export const getMessageDetailsApi = async (data) => await axios.get(`/Message/thread-messages/${data}`, data);
export const getAllMessagesApi = async (data) => await axios.get("/Message/thread-messages", data);
