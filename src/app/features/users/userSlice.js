import { createSlice } from '@reduxjs/toolkit'

const initialUser = {
  id: "", 
  fname: "", 
  lname: "", 
  email: "", 
  mainpic: "", 
  pics: "", 
  private: false, 
  bio: ""
}

const initialState = {
  myProfile: initialUser,
  otherUsers: []
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      for(let key in action.payload) {
        if(state.myProfile[key] !== undefined){
          state.myProfile[key] = action.payload[key]; 
        }
      }
    },
    logout: (state, action) => {
      state.myProfile = initialUser;
    },
    searchOtherUsers: (state, action) => {

    },
    addUpload: (state, action) => {

    },
    rmUpload: (state, action) => {

    },
    editProfile: (state, action) => {
      for(let key in action.payload) {
        if(state.myProfile[key] !== undefined){
          state.myProfile[key] = action.payload[key];
        } 
      }
    }
  }
})

export const profile = (state) => state.users.myProfile; 
export const loggedIn = (state) => state.users.myProfile.id !== "";

export const { login, logout, searchOtherUsers, addUpload, rmUpload, editProfile } = userSlice.actions

export default userSlice.reducer