import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer';
export const mockUsersState = {
  myProfile: {
       id: "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "fname": "Jacob",
      "lname": "Stevens",
      "email": "jakestevens082@gmail.com",
      "media": [],
      "mainpic": 0, 
      "bio":  "I love goals! BatChest!",
      "currentGoal": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1",
      "listMode": "grid",
      "joinDate": 1654332007,
      "privateProfile": false
  },
  otherUsers: [
    {
      id: "test1",
      "fname": "Ben",
      "lname": "Meza",
      "email": "osail98@gmail.com",
      "media": [],
      "mainpic": 0, 
      "bio":  "I love goals! BatChest!",
      "goalsachieved": 2, 
      "currentgoal": "Bench 315"
    },
    {
      id: "test2",
      "fname": "Justin",
      "lname": "Stevens",
      "email": "jstevenszz2728@gmail.com",
      "media": [],
      "mainpic": 0, 
      "bio":  "BatChest!",
      "goalsachieved": 0, 
      "currentgoal": "Bench 365"
    },
    {
      id: "test3",
      "fname": "Taylor",
      "lname": "Dockter",
      "email": "taylor7582@gmail.com",
      "media": [],
      "mainpic": 0, 
      "bio":  "I love goals! BatChest!",
      "goalsachieved": 0, 
      "currentgoal": "Bench 135"
    } 
  ]
}

const initialUser = {
  id: "", 
  fname: "", 
  lname: "", 
  email: "", 
  mainpic: "",
  media: [], 
  pics: "", 
  bio: "",
  currentGoal: "",
  joinDate: 0,
  privateProfile: false,
  listMode: "list",
  currentGoal: ""
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
      state.otherUsers = []; 
    },
    addOtherUser: (state, action) => {
      state.otherUsers.push(action.payload);
    },
    searchOtherUsers: (state, action) => {

    },
    addUpload: (state, action) => {
      state.myProfile.media.push(action.payload);
    },
    rmUpload: (state, action) => {

    },
    setMainPicIndex: (state, action) => {
      console.log("set main pic");
      state.myProfile.media = produce(state.myProfile.media, draft => {
        const temp = draft[action.payload.index]; 
        draft.splice(action.payload.index, 1);
        draft.unshift(temp);
      })
    },
    setMediaIndex: (state, action) => {
      console.log("set media index");
      if(state.myProfile.media.length === 1) {
        return;
      }
      if(action.payload.index === 0) {
        if(action.payload.newIndex === -1) { 
          return; 
        }
      }
      if(action.payload.index === state.myProfile.media.length - 1) {
        if(action.payload.newIndex === state.myProfile.media.length) {
           return;
        }
      }
      const temp = JSON.parse(JSON.stringify(state.myProfile.media[action.payload.index])); 
      const swap = JSON.parse(JSON.stringify(state.myProfile.media[action.payload.newIndex])); 
      state.myProfile.media[action.payload.newIndex] = temp; 
      state.myProfile.media[action.payload.index] = swap; 
    },
    editProfile: (state, action) => {
      for(let key in action.payload) {
        if(state.myProfile[key] !== undefined){
          state.myProfile[key] = action.payload[key];
        } 
      }
    },
    removePicIndex: (state, action) => {
      state.myProfile.media = produce(state.myProfile.media, draft => {
        draft.splice(action.payload.index, 1);
      })
    },
    setListMode: (state, action) => {
      state.myProfile.listMode = action.payload;
    }
  }
})

export const profile = (state) => state.users.myProfile; 
export const loggedIn = (state) => state.users.myProfile.id !== "";
export const selectOtherUsers = (state) => state.users.otherUsers; 
export const selectCurrentGoal = (state) => state.users.myProfile.currentGoal;
export const selectListMode = (state) => state.users.myProfile.listMode;

export const { setListMode, login, logout, searchOtherUsers, addUpload, rmUpload, editProfile, addOtherUser, setMediaIndex, setMainPicIndex, removePicIndex } = userSlice.actions

export default userSlice.reducer