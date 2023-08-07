import AuthReducer from "./Auth/AuthSlice";
import CriteriaSlice from "./Criteria/CriteriaSlice";
import LoadingReducer from "./Loading/LoadingSlice";
import MentorManagersSlice from "./MentorManagers/MentorManagersSlice";
import MentorsSlice from "./Mentors/MentorsSlice";
import MessagesSlice from "./Messages/MessagesSlice";
import ModalReducer from "./Modal/ModalSlice";
import ProfileSlice from "./Profile/ProfileSlice";
import ProgramsSlice from "./Programs/ProgramsSlice";
import ReportsReducer from "./Reports/ReportsSlice";
import SettingsReducer from "./Settings/SettingsSlice";
import TasksSlice from "./Tasks/TasksSlice";
import { configureStore } from "@reduxjs/toolkit";

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
