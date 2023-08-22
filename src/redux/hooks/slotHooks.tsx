import {useDispatch} from "react-redux";
import {useAppSelector} from "../store";

import {RootState} from "../store";

import {
    setUserLocation,
    setSlotAvailability,
    setSlots,
    setUserLocationSvg
} from "../slices/slotSlice";

export const SlotHook = () => {
    const dispatch = useDispatch();

    const {userLocation, slots, nearestSlot, userLocationSvg} = useAppSelector((state: RootState) => state.slot);

    const handleSetUserLocationSvg = (location: { lat: string, lng: string }) => {
        dispatch(setUserLocationSvg(location));
    }

    const handleSetUserLocation = (location: { lat: number, lng: number }) => {
        dispatch(setUserLocation(location));
    }

    const handleSetSlotAvailability = (id: string, isAvailable: boolean) => {
        dispatch(setSlotAvailability({id, isAvailable}));
    }

    const handleSetSlots = (slots: any) => {
        dispatch(setSlots(slots));
    }

    return {
        userLocation,
        userLocationSvg,
        slots,
        nearestSlot,
        handleSetUserLocation,
        handleSetUserLocationSvg,
        handleSetSlotAvailability,
        handleSetSlots
    }
}