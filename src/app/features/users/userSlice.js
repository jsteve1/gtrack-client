import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  myProfile: {},
  otherUsers: []
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {

    },
    logout: (state, action) => {

    },
    searchOtherUsers: (state, action) => {

    },
    addUpload: (state, action) => {

    },
    rmUpload: (state, action) => {

    },
    editProfile: (state, action) => {

    }}
})

export const { login, logout, searchOtherUsers, addUpload, rmUpload, editProfile } = userSlice.actions

export default userSlice.reducer