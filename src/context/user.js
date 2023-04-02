import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = null;
export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
