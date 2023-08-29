export const GET_API = () => {
  return {
    getAllSpaces: "/get-all-parking-space",
    findNearestSpace: "/find-nearest-space",
  };
};

export const UPDATE_API = (name: String) => {
  return {
    updateStatus: `/update-status-space/${name}`,
  };
};
