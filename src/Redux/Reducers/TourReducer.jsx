const initialState = {
  homePage1: false,
  nWS1: false,
  nWS2: false,
  nWS3: false,
  nWS4: false,
  sW1: false,
  sW2: false,
};

const tourReducer = (state = initialState, action) => {
  switch (action.type) {
    //* Set which tour to activate
    case "ACTIVATE_TOUR":
      return { ...state, [action.tourId]: true };
    //* Set which tour to deactivate
    case "DEACTIVATE_TOUR":
      return { ...state, [action.tourId]: false };
    //* will close all tours
    case "END_TOUR":
      return initialState;
    // case "CONTINUE_TOUR":
    //   return { ...state, tourOn: action.payload };

    default:
      return { ...state };
  }
};

export default tourReducer;
