import { createSlice, current } from '@reduxjs/toolkit'
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

export const mockGoalState = {
  goals: [
    {
      id: "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe2",
      "name": "Bench Press 405", 
      "deadline": 1655332007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 1, 
      "reminders": {
        "daily": false,
        "daybefore": false
      },
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": false, 
      "mediacomplete": 0,
      "completedtime": 0,
      "mainpic": "",
      "private": false
    },
    {
      id: "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3",
      "name": "Squat 475", 
      "deadline": 1655332007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 2, 
      "reminders": {
        "daily": false,
        "daybefore": false
      },
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": false, 
      "mediacomplete": 0,
      "completedtime": 0,
      "mainpic": "",
      "private": true
    },
    {
      id: "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4",
      "name": "Squat 455", 
      "deadline": 1655532007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 3, 
      "reminders": {
        "daily": false,
        "daybefore": false
      },
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": true, 
      "mediacomplete": 0,
      "completedtime": 1655391007,
      "mainpic": "",
      "private": false
    },
    {
      "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1",
      "name": "Bench Press 365", 
      "deadline": 1655392007,
      "userid": "35942fde-d1a0-443e-aa0c-b383fe915bc5",
      "viewable": true, 
      "priority": 4, 
      "reminders": {
        "daily": false,
        "daybefore": false
      },
      "media": [], 
      "starttime": 1654381607,
      "postponed": false, 
      "complete": true, 
      "mediacomplete": 0,
      "completedtime": 1655391007,
      "mainpic": "",
      "private": false
    },
  ],
  progressMarkers: {
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1": [
    {
      "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9abc1",
      "name": "Bench Press 355", 
      "deadline": 1654829637,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1",
      "completed": true
    },
    {
      "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9abc2",
      "name": "Floor Press 315", 
      "deadline": 1654829637,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe1",
      "completed": false
    }
   ],
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe2": [],
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3": [
    {
      "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9abc3",
      "name": "Squat 455 for 2", 
      "deadline": 1654899637,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3",
      "completed": true
    },
    {
      "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9abc4",
      "name": "Squat 405 for 5", 
      "deadline": 1654923937,
      "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe3",
      "completed": false
    }
   ], 
   "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4": [
      {
        "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9abc5",
        "name": "Squat 405 for 3", 
        "deadline": 1654899637,
        "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4",
        "completed": false
      },
      {
        "id": "6a8af92c-7a41-479b-91fb-e4cc1ce9abc16",
        "name": "Bentover Row 315 for 8", 
        "deadline": 1654923937,
        "goalid": "6a8af92c-7a41-479b-91fb-e4cc1ce9cbe4",
        "completed": false,
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
    logoutGoals: (state, action) => {
      state.goals = []; 
      state.progressMarkers = {}; 
    },
    addGoal: (state, action) => {
      const goal = action.payload; 
      if(!goal.id) {
        goal.id = uuidv4();
      }
      const newIndex = goal.priority - 1; 
      if(newIndex < 0 || newIndex > state.goals.length) {
        console.log("New goal priority out of range"); 
        return; 
      }
      state.goals.splice(newIndex, 0, goal); 
      for(let i = 0; i < state.goals.length; i++) {
        state.goals[i].priority = i + 1; 
      }
    },
    removeGoal: (state, action) => {
      state.goals = state.goals.filter((goal) => {
        if(goal.id === action.payload.id) { 
          return false; 
        } else return true;
      });
      state.goals.sort((a, b) => {
        return a.priority - b.priority;
      });
      let idx = 1;
      for(let goal of state.goals) {
        goal.priority = idx; 
        idx++; 
      }
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
          let goalsCopy = JSON.parse(JSON.stringify(_goals)).filter(goal => goal.complete === false);
          const currGoal = _goals[index]; 
          goalsCopy = goalsCopy.filter(goal => goal.id !== currGoal.id); 
          goalsCopy.splice(newIndex, 0, currGoal);
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
      console.log("adding progress marker to goal", goal, action.payload.goalid);
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
    },
    setMainPicIndex: (state, action) => {
      console.log("set main pic id " + action.payload.id);
      const goal = state.goals.find(goal => goal.id === action.payload.id); 
      goal.media = produce(goal.media, draft => {
        const temp = draft[action.payload.index]; 
        draft.splice(action.payload.index, 1);
        draft.unshift(temp);
      });
    },
    setMediaIndex: (state, action) => {
      console.log("set media index goal id " + action.payload.id);
      const goal = state.goals.find(goal => goal.id === action.payload.id); 
      if(goal.media.length === 1) {
        return;
      }
      if(action.payload.index === 0) {
        if(action.payload.newIndex === -1) { 
          return; 
        }
      }
      if(action.payload.index === goal.media.length - 1)
         if(action.payload.newIndex === goal.media.length) {
           return;
        }
      const temp = JSON.parse(JSON.stringify(goal.media[action.payload.index])); 
      const swap = JSON.parse(JSON.stringify(goal.media[action.payload.newIndex])); 
      goal.media[action.payload.newIndex] = temp; 
      goal.media[action.payload.index] = swap; 
    },
    addUpload: (state, action) => {
      console.log("add media goal id " + action.payload.id);
      const goal = state.goals.find(goal => goal.id === action.payload.id);
      goal.media.push(action.payload.img);
    },
    removePicIndex: (state, action) => {
      console.log("remove media goal id " + action.payload.id);
      const goal = state.goals.find(goal => goal.id === action.payload.id);
      goal.media = produce(goal.media, draft => {
        draft.splice(action.payload.index, 1);
      })
    },
    removeAllMedia: (state, action) => {
      console.log("removing all goal media " + action.payload.id);
      const goal = state.goals.find(goal => goal.id === action.payload.id);
      if(goal) goal.media = [];
    },
    setReminders: (state, action) => {
      const goal = state.goals.find(goal => goal.id === action.payload.id);
      if(goal) {
        if(action.payload.daily !== undefined) {
          if(action.payload.daily !== false && !isNaN(action.payload.daily) && Number.isFinite(action.payload.daily)) {
            goal.reminders.daily = action.payload.daily; 
          } 
          if(action.payload.daily === false) {
            goal.reminders.daily = false; 
          }
        }
        if(action.payload.daybefore !== undefined) {
          goal.reminders.daybefore = action.payload.daybefore; 
        } 
      }
    },
    markComplete: (state, action) => {
      console.log("marking goal complete", action.payload.id); 
      const goal = state.goals.find(goal => goal.id === action.payload.id);
      if(goal) {
        goal.complete = true; 
        goal.completedtime = Math.round(Date.now() / 1000); 
        goal.postponed = false; 
        goal.reminders = { daily: false, daybefore: false };
        goal.priority = -1; 
      }
      if(state.progressMarkers[action.payload.id]) {
        for(let prgmrk of state.progressMarkers[action.payload.id]) {
          prgmrk.completed = true; 
        }
      }
      const goalsCopy = state.goals.filter(_goal => _goal.id !== goal.id); 
      for(let i = 0; i < goalsCopy.length; i++) {
          goalsCopy[i].priority = i + 1;
      }
      const completedGoals = state.goals.filter(_goal => _goal.id !== goal.id && (_goal.complete === true || _goal.completedtime !== 0)); 
      for(let goal of completedGoals) {
        goal.priority = -1;
      }
      completedGoals.unshift(goal); 
      state.goals = [...goalsCopy, ...completedGoals];
    }
  }
})

export const selectGoal = (id) => (state) => {
  return state.goals.goals.find(goal => goal.id === id);
}
export const selectGoalProgressMarkers = (id) => (state) => {
  return state.goals.progressMarkers[id];
}
export const selectGoals = (state) => state.goals.goals; 
export const selectTodoGoals = (state) => state.goals.goals.filter(goal => goal.complete === false || goal.completedtime === 0); 
export const selectCompleteGoals = (state) => state.goals.goals.filter(goal => goal.complete === true); 
export const selectPostponedGoals = (state) => state.goals.goals.filter(goal => goal.postponed === true); 
export const selectProgressMarkers = (state) => state.goals.progressMarkers;
export const selectNumCompleted = (userid) => (state) => state.goals.goals.filter(goal => goal.complete === true && goal.userid === userid).length;
export const selectNumTodo = (userid) => (state) => state.goals.goals.filter(goal => goal.completed !== true && goal.completedtime === 0 && goal.userid === userid).length;

export const { 
              logoutGoals,
              addGoal, 
              removeGoal, 
              addProgressMarker, 
              rmProgressMarker, 
              setGoals, 
              updateGoal, 
              setGoalIndex,
              setMainPicIndex,
              setMediaIndex,
              addUpload,
              removePicIndex,
              setReminders,
              removeAllMedia,
              markComplete
            } = goalSlice.actions

export default goalSlice.reducer