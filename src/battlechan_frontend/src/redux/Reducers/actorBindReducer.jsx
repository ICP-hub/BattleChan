import { createSlice } from '@reduxjs/toolkit';

const initialActorState = {
  actor: null,
  error: null,
};

const actorSlice = createSlice({
  name: 'actors',
  initialState: initialActorState,
  reducers: {
    setActor: (state, action) => {
      // console.log('setActor action:', action.payload);
      state.actor = action.payload;
      state.error = null;
    },
    actorError: (state, action) => {
      state.error = action.payload;
    },
    handleActorRequest: (state, action) => {
    },
  },
});

export const { setActor, actorError, handleActorRequest } = actorSlice.actions;
export default actorSlice.reducer;
