import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Slot from "../../data/Slot";

export interface Location {
    lat: number,
    lng: number
}

const initialState = {
    userLocationSvg: {
        lat: "80%",
        lng: "80%"
    },
    userLocation: {
        lat: 0,
        lng: 0
    },
    
    slots: Slot.slots,
    totalEmptySlot: 0,
    nearestSlot: {}
}

const slotSlice = createSlice({
    name: 'slot',
    initialState,
    reducers: {
        setUserLocationSvg(state, action: PayloadAction<any>) {
            state.userLocationSvg = action.payload;
        },
        setUserLocation(state, action: PayloadAction<Location>) {
            state.userLocation = action.payload;
        },
        setNearestSlot(state, action: PayloadAction<any>) {
            state.nearestSlot = action.payload;
        },
        setSlots: (state, action: PayloadAction<any>) => {
            state.slots = action.payload;
        },
        setSlotAvailability(state, action: PayloadAction<{ id: string, isAvailable: boolean }>) {
            const index = state.slots.findIndex(slot => slot.id === action.payload.id);
            state.slots[index].isAvailable = action.payload.isAvailable;
        },
        setTotalEmptySlot: (state, action: PayloadAction<number>) => {
            state.totalEmptySlot = action.payload;
        }
    }
});

export const {
    setUserLocation,
    setSlotAvailability,
    setTotalEmptySlot,
    setSlots,
    setUserLocationSvg
} = slotSlice.actions;

export default slotSlice.reducer;