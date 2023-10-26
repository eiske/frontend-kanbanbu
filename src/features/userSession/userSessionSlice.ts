import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  name: string;
  token: string;
}

interface UserSessionState {
  userInfo: UserInfo;
}

const initialState: UserSessionState = {
  userInfo: {
    name: "",
    token: "",
  },
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setCalendarDate: (state, { payload }: PayloadAction<UserInfo>) => {
      state.userInfo = payload;
    },
  },
});

export const { setCalendarDate } = userSessionSlice.actions;
export default userSessionSlice.reducer;
