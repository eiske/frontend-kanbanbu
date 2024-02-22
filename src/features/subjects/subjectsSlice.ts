import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from '@services/subjects';

interface SubjectsState {
    subjects: Subject[];
    subject: Subject
}

const initialState: SubjectsState = {
    subjects: [],
    subject: {},
};

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSubjectList: (state, { payload }: PayloadAction<Subject[]>) => {
            state.subjects = payload;
        },
        addSubject: (state, { payload }: PayloadAction<Subject>) => {
            state.subject = payload;
        },
    },
});

export const { setSubjectList, addSubject } = subjectsSlice.actions;
export default subjectsSlice.reducer;
