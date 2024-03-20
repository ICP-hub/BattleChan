import { createSlice } from "@reduxjs/toolkit";

const initialMultiChainState = {
  chains: [],
  loading: false,
  error: null,
};

const multiChainSlice = createSlice({
  name: "chains",
  initialState: initialMultiChainState,
  reducers: {
    multiChainHandlerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    multiChainHandlerSuccess: (state, action) => {
      // console.log("action.payload in multiChain reducer == >",action.payload)
      state.loading = false;
      state.chains = action.payload;
    },
    multiChainHandlerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { multiChainHandlerFailure, multiChainHandlerRequest, multiChainHandlerSuccess } =
  multiChainSlice.actions;

export default multiChainSlice.reducer;
