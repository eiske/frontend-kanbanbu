import userSessionReducer from '@/features/userSession/userSessionSlice';
import calendarReducer from '@/features/calendarDate/calendarDateSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    userSession: userSessionReducer,
    calendarDate: calendarReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
