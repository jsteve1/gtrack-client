import { configureStore } from '@reduxjs/toolkit'
import goalReducer from './features/goals/goalSlice'
import userReducer from './features/users/userSlice'
import uiReducer from './features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    goals: goalReducer,
    ui: uiReducer
  }
})