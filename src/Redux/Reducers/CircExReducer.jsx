// *rxreducer

const initialState = {
  selectedCircEx: null,
  position: 1,
  circExs: [],
  fetching: false,
  error: false,
};

const circExReducer = (state = initialState, action) => {
  switch (action.type) {
    //* Set Selected Folder
    //   case "SET_SELECTED_FOLDER":
    //     return { ...state, selectedFolder: action.folder };
    //   case "FETCH_FOLDER_SUCCESSFUL":
    //     return { ...state, circExs: action.folder.circExs };

    // * Clear selectedCircEx from State

    case "CLEAR_SELECTED_CIRC_EX":
      return { ...state, selectedCircEx: null };

    // * Modify Position

    case "INCREASE_POS_CIRC_EX":
      return { ...state, position: state.position + 1 };
    case "DECREASE_POS_CIRC_EX":
      return { ...state, position: state.position - 1 };
    case "CLEAR_POS_CIRC_EX_VAL":
      return { ...state, position: 1 };
    case "POST_WORK_CIRCUIT_SUCCESSFUL":
      return { ...state, position: 1 };

    //* Fetch CircExs Belonging To User

    case "FETCH_CIRC_EXS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_CIRC_EXS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_CIRC_EXS_SUCCESSFUL":
      return { ...state, fetching: false, circExs: action.circExs };

    //* Fetch SHOW CircEx

    case "FETCH_CIRC_EX_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_CIRC_EX_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_CIRC_EX_SUCCESSFUL":
      return { ...state, fetching: false, selectedCircEx: action.circEx };

    //* POST New CircEx

    case "POST_CIRC_EX_REQUEST":
      return { ...state, fetching: true };
    case "POST_CIRC_EX_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_CIRC_EX_SUCCESSFUL":
      //   const newCircExsPOST = [...state.circExs, action.circEx];
      //   return { ...state, fetching: false, circExs: newCircExsPOST };
      return {
        ...state,
        fetching: false,
        circExs: [...state.circExs, action.circEx],
        selectedCircEx: action.circEx,
      };

    //* PATCH circEx

    case "PATCH_CIRC_EX_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_CIRC_EX_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_CIRC_EX_SUCCESSFUL":
      const newCircExsPATCH = [
        ...[...state.circExs.filter((circEx) => circEx.id != action.circEx.id)],
        action.circEx,
      ];
      const sortedPATCH = newCircExsPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        circExs: sortedPATCH,
        selectedCircEx: action.circEx,
      };
    //* DESTROY circEx

    case "DELETE_CIRC_EX_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_CIRC_EX_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_CIRC_EX_SUCCESSFUL":
      const newCircExsDESTROY = [
        ...state.circExs.filter((circEx) => circEx.id != action.circEx.id),
      ];
      return { ...state, fetching: false, circExs: newCircExsDESTROY };
    default:
      return state;
  }
};

export default circExReducer;
