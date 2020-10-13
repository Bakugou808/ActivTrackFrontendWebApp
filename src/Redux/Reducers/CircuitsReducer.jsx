// *rxreducer

const initialState = {
  selectedCircuit: null,
  circuits: [],
  fetching: false,
  error: false,
};

const circuitReducer = (state = initialState, action) => {
  switch (action.type) {
    //* Set Selected Folder
    //   case "SET_SELECTED_FOLDER":
    //     return { ...state, selectedFolder: action.folder };
    //   case "FETCH_FOLDER_SUCCESSFUL":
    //     return { ...state, circuits: action.folder.circuits };

    //* Fetch Circuits Belonging To User

    case "FETCH_CIRCUITS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_CIRCUITS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_CIRCUITS_SUCCESSFUL":
      return { ...state, fetching: false, circuits: action.circuits };

    //* Fetch SHOW Circuit

    case "FETCH_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_CIRCUIT_SUCCESSFUL":
      return { ...state, fetching: false, selectedCircuit: action.circuit };

    //* POST New Circuit

    case "POST_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "POST_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_CIRCUIT_SUCCESSFUL":
      //   const newCircuitsPOST = [...state.circuits, action.circuit];
      //   return { ...state, fetching: false, circuits: newCircuitsPOST };
      return { ...state, fetching: false, selectedCircuit: action.circuit };

    //* PATCH circuit

    case "PATCH_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_CIRCUIT_SUCCESSFUL":
      const newCircuitsPATCH = [
        ...[
          ...state.circuits.filter(
            (circuit) => circuit.id != action.circuit.id
          ),
        ],
        action.circuit,
      ];
      const sortedPATCH = newCircuitsPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        circuits: sortedPATCH,
        selectedCircuit: action.circuit,
      };
    //* DESTROY circuit

    case "DELETE_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_CIRCUIT_SUCCESSFUL":
      const newCircuitsDESTROY = [
        ...state.circuits.filter((circuit) => circuit.id != action.circuit.id),
      ];
      return { ...state, fetching: false, circuits: newCircuitsDESTROY };
    default:
      return state;
  }
};

export default circuitReducer;
