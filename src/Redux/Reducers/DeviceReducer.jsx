const initialState = {
  device: !!navigator.maxTouchPoints ? "mobile" : "computer",
  orientation: !navigator.maxTouchPoints
    ? "desktop"
    : !window.screen.orientation.angle
    ? "portrait"
    : "landscape",
};

const deviceReducer = (state = initialState, action) => {
  switch (action.type) {
    // SET DEVICE TYPE
    case "SET_DEVICE":
      return {
        ...state,
        device: !!navigator.maxTouchPoints ? "mobile" : "computer",
      };

    // SET DISPLAY ORIENTATION
    case "SET_DISPLAY_ORIENTATION":
      return {
        ...state,
        orientation: !navigator.maxTouchPoints
          ? "desktop"
          : !window.screen.orientation.angle
          ? "portrait"
          : "landscape",
      };

    default:
      return state;
  }
};

export default deviceReducer;
