import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Location {
  lat: number;
  lng: number;
}

interface space {
  space_number: string;
  status: string;
  lat: number;
  long: number;
  line: number;
  level: number;
}

const initialState = {
  isLoading: false,
  userLocationSvg: {
    lat: "80%",
    lng: "80%",
  },
  userLocation: {
    lat: 0,
    lng: 0,
  },

  slots: [] as space[],
  totalEmptySlot: 0,
  nearestSlot: {} as space,
};

const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<any>) {
      state.isLoading = action.payload;
    },

    setUserLocationSvg(state, action: PayloadAction<any>) {
      state.userLocationSvg = action.payload;
    },
    setUserLocation(state, action: PayloadAction<Location>) {
      state.userLocation = action.payload;
    },
    setNearestSlot(state, action: PayloadAction<any>) {
      state.nearestSlot = action.payload;
    },

    setStatusSpace(state, action: PayloadAction<any>) {
      const data = action.payload;
      console.log(data)
      const { space_number, status } = data.updateStatus;

      if (space_number && status) {
        const updateState = state.slots.map((each) =>
           each.space_number === space_number ? { ...each, status } : each
        );

        state.slots = updateState;
        console.log(state.slots)
      }
    },

    getTotalSlots(state, action: PayloadAction<any>) {
      state.slots = action.payload;
    },
  },
});

export const {
  setUserLocation,
  setUserLocationSvg,
  setNearestSlot,
  setStatusSpace,
  getTotalSlots,
  setLoading,
} = slotSlice.actions;

export default slotSlice.reducer;
