// *rxreducer

const initialState = {
  selectedWorkCircuit: null,
  workCircuits: [],
  fetching: false,
  error: false,
};

const workCircuitReducer = (state = initialState, action) => {
  switch (action.type) {

    //* Fetch WorkCircuits Belonging To User

    case "FETCH_WORK_CIRCUITS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_WORK_CIRCUITS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_WORK_CIRCUITS_SUCCESSFUL":
      return { ...state, fetching: false, workCircuits: action.workCircuits };

    //* Fetch SHOW WorkCircuit

    case "FETCH_WORK_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_WORK_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_WORK_CIRCUIT_SUCCESSFUL":
      return {
        ...state,
        fetching: false,
        selectedWorkCircuit: action.workCircuit,
      };

    //* POST New WorkCircuit

    case "POST_WORK_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "POST_WORK_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_WORK_CIRCUIT_SUCCESSFUL":
      return {
        ...state,
        fetching: false,
        workCircuits: [...state.workCircuits, action.workCircuit],
        selectedWorkCircuit: action.workCircuit,
      };

    //* PATCH workCircuit

    case "PATCH_WORK_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_WORK_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_WORK_CIRCUIT_SUCCESSFUL":
      const newWorkCircuitsPATCH = [
        ...[
          ...state.workCircuits.filter(
            (workCircuit) => workCircuit.id != action.workCircuit.id
          ),
        ],
        action.workCircuit,
      ];
      const sortedPATCH = newWorkCircuitsPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        workCircuits: sortedPATCH,
        selectedWorkCircuit: action.workCircuit,
      };
    //* DESTROY workCircuit

    case "DELETE_WORK_CIRCUIT_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_WORK_CIRCUIT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_WORK_CIRCUIT_SUCCESSFUL":
      const newWorkCircuitsDESTROY = [
        ...state.workCircuits.filter(
          (workCircuit) => workCircuit.id != action.workCircuit.id
        ),
      ];
      return {
        ...state,
        fetching: false,
        workCircuits: newWorkCircuitsDESTROY,
      };
    default:
      return state;
  }
};

export default workCircuitReducer;
