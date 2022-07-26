import { createSlice, current } from '@reduxjs/toolkit'

export const mockGoalState = {
  goals: [
    {
      id: "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe2",
      "name": "Bench Press 405", 
      "deadline": 1655332007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 1, 
      "reminders": true,
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": false, 
      "mediacomplete": 0,
      "completedtime": 0
    },
    {
      id: "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3",
      "name": "Squat 475", 
      "deadline": 1655332007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 2, 
      "reminders": true,
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": false, 
      "mediacomplete": 0,
      "completedtime": 0
    },
    {
      id: "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4",
      "name": "Squat 455", 
      "deadline": 1655532007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 3, 
      "reminders": true,
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": true, 
      "mediacomplete": 0,
      "completedtime": 1655391007
    },
    {
      "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1",
      "name": "Bench Press 365", 
      "deadline": 1655392007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 4, 
      "reminders": true,
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": true, 
      "mediacomplete": 0,
      "completedtime": 1655391007
    },
  ],
  progressMarkers: {
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1": [
    {
      "name": "Bench Press 355", 
      "deadline": 1654829637,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1"
    },
    {
      "name": "Floor Press 315", 
      "deadline": 1654829637,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1"
    }
   ],
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe2": [],
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3": [
    {
      "name": "Squat 455 for 2", 
      "deadline": 1654899637,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3"
    },
    {
      "name": "Squat 405 for 5", 
      "deadline": 1654923937,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3"
    }
   ], 
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4": [
      {
        "name": "Squat 405 for 3", 
        "deadline": 1654899637,
        "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4"
      },
      {
        "name": "Bentover Row 315 for 8", 
        "deadline": 1654923937,
        "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4"
      }
   ]
  }
}

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
    setGoals: (state, action) => {
      state.goals = action.payload.goals;
    },
    updateGoal: (state, action) => {
      for(let goal of state.goals) {
        if(goal.id === action.payload.id) {
          for(let key in action.payload.updateGoal) {
            if(goal[key] !== undefined) {
              goal[key] = action.payload.updateGoal[key];
            }
          }
        }
      }
    },
    setGoalIndex: (state, action) => {
      const index = action.payload.index; 
      const newIndex = action.payload.newIndex; 
      const _goals = state.goals;
      if(index > -1 && index < _goals.length && index !== 0 && newIndex === 0) {
          const goal = JSON.parse(JSON.stringify(_goals[index])); 
          let newGoals = JSON.parse(JSON.stringify(_goals)).filter(goal => goal.complete === false);
          newGoals = newGoals.filter((val, idx) => {
              return index !== idx;
          });
          newGoals.unshift(goal);
          for(let i = 0; i < newGoals.length; i++) {
              let newGoal = JSON.parse(JSON.stringify(newGoals[i]));
              newGoal.priority = i + 1;
              newGoals[i] = JSON.parse(JSON.stringify(newGoal));
          }
          const completedGoals = _goals.filter(goal => goal.complete === true || goal.completedtime !== 0); 
          for(let goal of completedGoals) {
            goal.priority = -1;
          }
          state.goals = [...newGoals, ...completedGoals];
      }
      if(index > _goals.length - 1 || index < 0) {
          console.log("index does not exist", index); 
      } else if(index === _goals.length - 1 && newIndex > index) {
          console.log("already at end");
      } else if(newIndex > _goals.length - 1) {
          console.log("cannot swap beyond length");
      } else if(newIndex < 0) {
          console.log("invalid new index");
      } else if(newIndex === index) {
          console.log("invalid new index");
      } else {
          const goalsCopy = JSON.parse(JSON.stringify(_goals)).filter(goal => goal.complete === false);
          const currGoal = _goals[index]; 
          const otherGoal = _goals[newIndex];
          goalsCopy[newIndex] = currGoal; 
          goalsCopy[index] = otherGoal; 
          for(let i = 0; i < goalsCopy.length; i++) {
            let newGoal = JSON.parse(JSON.stringify(goalsCopy[i]));
            newGoal.priority = i + 1;
            goalsCopy[i] = JSON.parse(JSON.stringify(newGoal));
        }
        const completedGoals = _goals.filter(goal => goal.complete === true || goal.completedtime !== 0); 
        for(let goal of completedGoals) {
          goal.priority = -1;
        }
        state.goals = [...goalsCopy, ...completedGoals];
      }
    },
    addProgressMarker: (state, action) => {
      const goal = state.goals.find(goal => goal.id === action.payload.goalid); 
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

export const selectGoals = (state) => state.goals.goals; 
export const selectTodoGoals = (state) => state.goals.goals.filter(goal => goal.complete === false || goal.completedtime === 0); 
export const selectCompleteGoals = (state) => state.goals.goals.filter(goal => goal.complete === true); 
export const selectProgressMarkers = (state) => state.goals.progressMarkers;

export const { addGoal, removeGoal, addProgressMarker, rmProgressMarker, setGoals, updateGoal, setGoalIndex } = goalSlice.actions

export default goalSlice.reducer