import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarDateState {
  date: Date[];
}

const initialState: CalendarDateState = {
    date: [],
};

const calendarDateSlice = createSlice({
    name: 'calendarDate',
    initialState,
    reducers: {
        setCalendarDate: (state, { payload }: PayloadAction<Date>) => {
            state.date = [...state.date, payload];
        },
    },
});

export const { setCalendarDate } = calendarDateSlice.actions;
export default calendarDateSlice.reducer;
