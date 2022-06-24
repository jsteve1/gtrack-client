import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  goals: [],
  progressMarkers: { }
}

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => {
        if(goal.id === action.payload.id) { 
          return false; 
        } else return true;
      });
    },
    updateGoal: (state, action) => {
      for(let goal of state.goals) {
        if(goal.id === action.payload.id) {
          for(let key in action.payload.goalUpdate) {
            if(goal[key] !== undefined) {
              goal[key] = action.payload.goalUpdate[key]; 
            }
          }
        }
      }
    },
    addProgressMarker: (state, action) => {
      const goal = state.goals.find(goal => goal.id === action.payload.id); 
      if(goal) {
        if(state.progressMarkers[goal.id] !== undefined) {
          state.progressMarkers[goal.id].push(action.payload.progressMarker); 
        } else {
          state.progressMarkers[goal.id] = [action.payload.progressMarker]; 
        }
      }
    },
    rmProgressMarker: (state, action) => {
      const goal = state.goals.find(goal => goal.id === action.payload.id); 
      if(goal) {
        if(state.progressMarkers[goal.id] !== undefined) {
          state.progressMarkers[goal.id] = state.progressMarkers[goal.id].filter((prgmkr) => {
            if(prgmkr === action.payload.id) {
              return false;
            } else return true;
          })
        } else {
          //no op
        }
      }
    }}
})

export const { addGoal, removeGoal, editGoal, addProgressMarker, rmProgressMarker } = goalSlice.actions

export default goalSlice.reducer