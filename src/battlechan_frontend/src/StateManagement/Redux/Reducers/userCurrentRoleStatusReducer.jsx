import { createSlice } from "@reduxjs/toolkit";

const initialRoleState = {
    rolesStatusArray: [],
    activeRole: null,
    loading: false,
    error: null,
};

const userCurrentRoleStatusSlice = createSlice({
    name: "userCurrentRoleStatus",
    initialState: initialRoleState,
    reducers: {

        getCurrentRoleStatusRequestHandler: (state) => {
            state.loading = true;
            state.error = null;
        },

        getCurrentRoleStatusFailureHandler: (state, action) => {
            state.activeRole = null,
            state.loading = false;
            state.error = action.payload;
        },

        setCurrentRoleStatus: (state, action) => {
            state.rolesStatusArray = action.payload,
                state.loading = false,
                state.error = null
        },

        setCurrentActiveRole: (state, action) => {
            state.activeRole = action.payload
            state.loading = false,
                state.error = null
        },

        switchRoleRequestHandler: (state, action) => {
            state.loading = false,
                state.error = null
        },

        switchRoleRequestFailureHandler: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
    },
});

export const { 
    getCurrentRoleStatusRequestHandler, 
    getCurrentRoleStatusFailureHandler, 
    setCurrentRoleStatus, 
    setCurrentActiveRole, 
    switchRoleRequestHandler, 
    switchRoleRequestFailureHandler } =
    userCurrentRoleStatusSlice.actions;

export default userCurrentRoleStatusSlice.reducer;
