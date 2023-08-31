import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{},
  followerFollowingList:{
    followers:[],
    following:[]
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },   
    setFollwersFollowings: (state, action) => {
      state.followerFollowingList = action.payload;
    }, 
  },
});

export const { setUsers,setFollwersFollowings} = userSlice.actions;

export default userSlice.reducer;
