// *rxreducer

const initialState = {
  selectedWorkout: null,
  workouts: [],
  fetching: false,
  error: false,
};

const workCircuitReducer = (state = initialState, action) => {
  switch (action.type) {
    //* Set Selected Folder
    case "SET_SELECTED_FOLDER":
      return { ...state, selectedFolder: action.folder };
    case "FETCH_FOLDER_SUCCESSFUL":
      return { ...state, workouts: action.folder.workouts };

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
