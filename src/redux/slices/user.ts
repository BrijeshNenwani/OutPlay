import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  user: object | null;
}

export const initialState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, actions: PayloadAction<IUserState>) => {
      state.user = actions.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
