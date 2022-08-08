import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showNewGoal: false,
    showActionMenu: false,
    showActionButton: false,
    showEditGoal: false, 
    showDeleteGoal: false,
    showMarkComplete: false,
    startingSortState: "priority",
    editGoalId: "",
    deleteGoalId: "",
    markCompleteId: ""
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    logoutUI: (state, action) => {
      state.showNewGoal = false;
      state.showActionMenu = false;
      state.showActionButton = false;
      state.showEditGoal = false; 
      state.showDeleteGoal = false;
      state.showMarkComplete = false;
      state.startingSortState = "priority";
      state.editGoalId = "";
      state.deleteGoalId = "";
      state.markCompleteId = "";
    },
    setShowNewGoal: (state, action) => {
      state.showNewGoal = action.payload; 
    },
    setShowActionMenu: (state, action) => {
      state.showActionMenu = action.payload;
    },
    setShowActionButton: (state, action) => {
      state.showActionButton = action.payload;
    },
    setStartingSortState: (state, action) => {
      state.startingSortState = action.payload;
    },
    setShowEditGoal: (state, action) => {
      state.showEditGoal = action.payload;
    },
    setShowDeleteGoal: (state, action) => {
      state.showDeleteGoal = action.payload;
    },
    setShowMarkComplete: (state, action) => {
      state.showMarkComplete = action.payload;
    },
    setEditGoalId: (state, action) => {
      state.editGoalId = action.payload; 
    },
    setMarkCompleteId: (state, action) => {
      state.markCompleteId = action.payload; 
    },
    setDeleteGoalId: (state, action) => {
      state.deleteGoalId = action.payload; 
    }
  }
})

export const selectShowActionButton = (state) => state.ui.showActionButton;
export const selectShowNewGoal = (state) => state.ui.showNewGoal; 
export const selectShowActionMenu= (state) => state.ui.showActionMenu; 
export const selectStartingSortState = (state) => state.ui.startingSortState;
export const selectShowEditGoal = (state) => state.ui.showEditGoal;
export const selectShowDeleteGoal = (state) => state.ui.showDeleteGoal;
export const selectShowMarkComplete = (state) => state.ui.showMarkComplete;
export const selectEditGoalId = (state) => state.ui.editGoalId;
export const selectMarkCompleteId = (state) => state.ui.markCompleteId;
export const selectDeleteGoalId = (state) => state.ui.deleteGoalId;

export const { 
    logoutUI,
    setShowNewGoal,
    setShowActionMenu,
    setShowActionButton,
    setStartingSortState,
    setShowEditGoal,
    setShowDeleteGoal,
    setShowMarkComplete,
    setEditGoalId,
    setMarkCompleteId,
    setDeleteGoalId
} = uiSlice.actions

export default uiSlice.reducer