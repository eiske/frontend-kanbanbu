import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
    id: string;
    name: string;
    token: string;
}

interface UserSessionState {
    userInfo: UserInfo;
}

const initialState: UserSessionState = {
  userInfo: {
    id: "",
    name: "",
    token: "",
  },
};

const userSessionSlice = createSlice({
  name: "userSession",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }: PayloadAction<UserInfo>) => {
      state.userInfo = payload;
    },
  },
});

export const userSelector = (state: any): UserInfo => state.userSession.userInfo
export const { setUserInfo } = userSessionSlice.actions;
export default userSessionSlice.reducer;
