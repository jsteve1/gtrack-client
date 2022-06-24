import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  goals: []
}

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state) => {

    },
    removeGoal: (state) => {

    },
    updateGoal: (state, action) => {

    },
    addProgressMarker: (state, action) => {

    },
    rmProgressMarker: (state, action) => {

    }}
})

export const { addGoal, removeGoal, editGoal, addProgressMarker, rmProgressMarker } = goalSlice.actions

export default goalSlice.reducer