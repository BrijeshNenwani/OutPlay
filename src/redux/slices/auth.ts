// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface IAuthState {
//   isAuthenticated: boolean;
//   token: string | null;
// }

// const initialState: IAuthState = {
//   isAuthenticated: false,
//   token: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     signIn: (state, action: PayloadAction<string>) => {
//       state.isAuthenticated = true;
//       state.token = action.payload;
//     },
//     signOut: (state) => {
//       state.isAuthenticated = false;
//       state.token = null;
//     },
//   },
// });

// export const { signIn, signOut } = authSlice.actions;
// export default authSlice.reducer;
