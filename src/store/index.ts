import calendarReducer from '@features/calendarDate/calendarDateSlice';
import subjectsReducer from '@features/subjects/subjectsSlice';
import userSessionReducer from '@features/userSession/userSessionSlice';

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        calendarDate: calendarReducer,
        subjects: subjectsReducer,
        userSession: userSessionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
