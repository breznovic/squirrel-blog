import { createSlice } from "@reduxjs/toolkit";

interface SortVisibilityState {
  isVisible: boolean;
}

const initialState: SortVisibilityState = {
  isVisible: false,
};

const sortVisibilitySlice = createSlice({
  name: "sortVisibility",
  initialState,
  reducers: {
    toggleSortVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    hideSortVisibility: (state) => {
      state.isVisible = false;
    },
  },
});

export const { toggleSortVisibility, hideSortVisibility } =
  sortVisibilitySlice.actions;
export default sortVisibilitySlice.reducer;
