import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const LocatorSlice = createSlice({
  name: "SelectedLocator",
  initialState,
  reducers: {
    SelectedLocatorSlice: (state, action) => {
      let locatorData = action.payload;
      return {
        ...locatorData,
      };
    },
  },
});
export const { SelectedLocatorSlice } = LocatorSlice.actions;
export { LocatorSlice };
