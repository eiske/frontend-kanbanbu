import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '@services/subjects';

interface SubjectsState {
    subjects: Subject[];
}

const initialState: SubjectsState = {
    subjects: [],
};

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSubjectList: (state, { payload }: PayloadAction<Subject[]>) => {
            state.subjects = payload;
        },
    },
});

export const subjectsSelector = (state: any): Subject[] => state.subjects.subjects;
export const { setSubjectList } = subjectsSlice.actions;
export default subjectsSlice.reducer;
