import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },   
  },
});

export const { setUsers} = userSlice.actions;

export default userSlice.reducer;
