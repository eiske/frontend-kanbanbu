import calendarReducer from '@features/calendarDate/calendarDateSlice';
import subjectsReducer from '@features/subjects/subjectsSlice';
import userSessionReducer from '@features/userSession/userSessionSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        subject: subjectsReducer,
        user: userSessionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const calendarSelector = (state: RootState) => state.calendar.date;
export const subjectsSelector = (state: RootState) => state.subject.subjects;
export const subjectSelector = (state: RootState) => state.subject.subject;
export const userSelector = (state: RootState) => state.user.userInfo;
export default store;
