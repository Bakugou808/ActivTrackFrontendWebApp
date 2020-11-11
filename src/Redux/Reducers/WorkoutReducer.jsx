// *rxreducer

const initialState = {
  selectedWorkout: null,
  formattedWorkout: null,
  workouts: [],
  showDrawer: false,
  currExRef: null,
  patchedExTitle: null,
  patchedCircExAtt: null,
  patchedCircuitSet: null,
  fetching: false,
  error: false,
};

const workCircuitReducer = (state = initialState, action) => {
  switch (action.type) {
    // * Clear Patched CircEx and Circuit
    case "CLEAR_PATCHED_CIRC_&_CIRC_EX":
      return {
        ...state,
        patchedCircExAtt: null,
        patchedCircuitSet: null,
        patchedExTitle: null,
      };
    // * Set Patched Exercise for Title
    case "PATCH_EXERCISE_SUCCESSFUL":
      return { ...state, patchedExTitle: action.exercise };
    // * Set Patched CircuitExercise for Attributes
    case "PATCH_CIRC_EX_SUCCESSFUL":
      return { ...state, patchedCircExAtt: action.circEx };
    // * Set Patched Circuit Set
    case "PATCH_CIRCUIT_SUCCESSFUL":
      return { ...state, patchedCircuitSet: action.circuit };
    // * Set Current Exercise Ref
    case "SET_CURRENT_EXERCISE_REF":
      return { ...state, currExRef: action.ref };
    // * Show Exercise Drawer
    case "SHOW_EX_DRAWER":
      return { ...state, showDrawer: !state.showDrawer };
    //* Set Selected Workout
    case "SET_SELECTED_WORKOUT":
      return { ...state, selectedWorkout: action.workout };
    //* Set Workouts Based On Selected Folder
    case "FETCH_FOLDER_SUCCESSFUL":
      return { ...state, workouts: action.folder.workouts };

    // * Clear Selected Workout and Formatted Workout State
    case "CLEAR_SELECTED_AND_FORMATTED_WORKOUT_STATE":
      return { ...state, selectedWorkout: null, formattedWorkout: null };

    //* Fetch Workouts Belonging To User

    case "FETCH_WORKOUTS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_WORKOUTS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_WORKOUTS_SUCCESSFUL":
      return { ...state, fetching: false, workouts: action.workouts };

    //* Fetch SHOW Workout

    case "FETCH_WORKOUT_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_WORKOUT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_WORKOUT_SUCCESSFUL":
      return { ...state, fetching: false, selectedWorkout: action.workout };

    //* Fetch FORMATTED Workout

    case "FETCH_FORMATTED_WORKOUT_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_FORMATTED_WORKOUT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_FORMATTED_WORKOUT_SUCCESSFUL":
      return { ...state, fetching: false, formattedWorkout: action.workout };

    //* POST New Workout

    case "POST_WORKOUT_REQUEST":
      return { ...state, fetching: true };
    case "POST_WORKOUT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_WORKOUT_SUCCESSFUL":
      //   const newWorkoutsPOST = [...state.workouts, action.workout];
      //   return { ...state, fetching: false, workouts: newWorkoutsPOST };
      return {
        ...state,
        fetching: false,
        workouts: [...state.workouts, action.workout],
        selectedWorkout: action.workout,
      };

    //* PATCH workout

    case "PATCH_WORKOUT_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_WORKOUT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_WORKOUT_SUCCESSFUL":
      const newWorkoutsPATCH = [
        ...[
          ...state.workouts.filter(
            (workout) => workout.id != action.workout.id
          ),
        ],
        action.workout,
      ];
      const sortedPATCH = newWorkoutsPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        workouts: sortedPATCH,
        selectedWorkout: action.workout,
      };
    //* DESTROY workout

    case "DELETE_WORKOUT_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_WORKOUT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_WORKOUT_SUCCESSFUL":
      const newWorkoutsDESTROY = [
        ...state.workouts.filter((workout) => workout.id != action.workout.id),
      ];
      return { ...state, fetching: false, workouts: newWorkoutsDESTROY };
    default:
      return state;
  }
};

export default workCircuitReducer;
