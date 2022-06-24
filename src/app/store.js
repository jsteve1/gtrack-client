import { configureStore } from '@reduxjs/toolkit'
import goalReducer from './features/goals/goalSlice'
import userReducer from './features/users/userSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    goals: goalReducer
  }
})