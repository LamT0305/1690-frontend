import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";

import { RootState } from "../store";

import {
  setUserLocation,
  setUserLocationSvg,
  setNearestSlot,
  setStatusSpace,
  getTotalSlots,
  setLoading,
} from "../slices/slotSlice";
import axiosInstance from "../../utils/Axios";
import { GET_API } from "../../utils/APIs";

export const SlotHook = () => {
  const dispatch = useDispatch();

  const { userLocation, slots, nearestSlot, userLocationSvg } = useAppSelector(
    (state: RootState) => state.slot
  );

  const handleSetUserLocationSvg = (location: { lat: string; lng: string }) => {
    dispatch(setUserLocationSvg(location));
  };

  const handleSetUserLocation = (location: { lat: number; lng: number }) => {
    dispatch(setUserLocation(location));
  };

  const handleGetSlots = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(GET_API().getAllSpaces);
      if (response.data.status == "success") {
        dispatch(getTotalSlots(response.data.spaces));
        // console.log(response.data.spaces);
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
    }
  };

  const handleGetNearestSlots = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(GET_API().findNearestSpace);
      if (response.data.status == "success") {
        dispatch(setNearestSlot(response.data.space));
        // console.log(response.data.space);
      }
      dispatch(setLoading(false));
    } catch (e) {
      console.log(e);
      dispatch(setLoading(false));
    }
  };

  const handleSetStatusSpace = async (data: {
    name: string;
    status: string;
  }) => {
    dispatch(setLoading(true));
    try {
      dispatch(setStatusSpace(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false)); // Make sure loading state is reset whether success or error
    }
  };

  return {
    userLocation,
    userLocationSvg,
    slots,
    nearestSlot,
    handleSetUserLocation,
    handleSetUserLocationSvg,
    handleGetSlots,
    handleGetNearestSlots,
    handleSetStatusSpace,
  };
};
