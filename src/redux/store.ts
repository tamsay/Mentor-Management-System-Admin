import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth/AuthSlice";
import ModalReducer from "./Modal/ModalSlice";
import LoadingReducer from "./Loading/LoadingSlice";
import SettingsReducer from "./Settings/SettingsSlice";
import ReportsReducer from "./Reports/ReportsSlice";
import CriteriaSlice from "./Criteria/CriteriaSlice";
import MentorsSlice from "./Mentors/MentorsSlice";
import MentorManagersSlice from "./MentorManagers/MentorManagersSlice";
import TasksSlice from "./Tasks/TasksSlice";
import ProgramsSlice from "./Programs/ProgramsSlice";
import ProfileSlice from "./Profile/ProfileSlice";
import MessagesSlice from "./Messages/MessagesSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    modal: ModalReducer,
    loading: LoadingReducer,
    settings: SettingsReducer,
    reports: ReportsReducer,
    criteria: CriteriaSlice,
    mentors: MentorsSlice,
    mentorManagers: MentorManagersSlice,
    tasks: TasksSlice,
    programs: ProgramsSlice,
    profile: ProfileSlice,
    messages: MessagesSlice
  },
  devTools: process.env.NODE_ENV === "development"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
