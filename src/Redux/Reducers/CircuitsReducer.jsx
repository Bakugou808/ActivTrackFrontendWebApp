// *rxreducer

const initialState = {
  selectedCircuit: null,
  phase: "",
  posWarmUp: 1,
  posBody: 1,
  posCoolDown: 1,
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

    //* Set Circuit Phase

    case "SETTING_PHASE":
      return { ...state, phase: action.phase };

    // * Clear selectedCircuit State once workout_circuit has been posted

    case "POST_WORK_CIRCUIT_SUCCESSFUL":
      return { ...state, selectedCircuit: null };

    // * Modify Position

    case "INCREASE_POS_CIRCUIT":
      switch (state.phase) {
        case "Warm Up":
          return { ...state, posWarmUp: state.posWarmUp + 1 };
        case "Body":
          return { ...state, posBody: state.posBody + 1 };
        case "Cool Down":
          return { ...state, posCoolDown: state.posCoolDown + 1 };
        default:
          return { ...state };
      }
    case "DECREASE_POS_CIRCUIT":
      switch (state.phase) {
        case "Warm Up":
          return { ...state, posWarmUp: state.posWarmUp - 1 };
        case "Body":
          return { ...state, posBody: state.posBody - 1 };
        case "Cool Down":
          return { ...state, posCoolDown: state.posCoolDown - 1 };
        default:
          return { ...state };
      }
    case "CLEAR_POS_CIRCUIT_VAL":
      switch (state.phase) {
        case "Warm Up":
          return { ...state, posWarmUp: 0 };
        case "Body":
          return { ...state, posBody: 0 };
        case "Cool Down":
          return { ...state, posCoolDown: 0 };
        default:
          return { ...state };
      }

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
      const newPos = state.position + 1;
      return {
        ...state,
        fetching: false,
        circuits: [...state.circuits, action.circuit],
        selectedCircuit: action.circuit,
        position: newPos,
      };

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
