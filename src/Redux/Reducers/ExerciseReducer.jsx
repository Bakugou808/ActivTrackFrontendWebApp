// *rxreducer

const initialState = {
  selectedExercise: null,
  exercises: [],
  fetching: false,
  error: false,
};

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {

    // * Clear selectedCircEx from State in multi-exercise circuit on addExercise

    case "CLEAR_SELECTED_EXERCISE":
      return { ...state, selectedExercise: null };

    // * Clear selectedExercise State once workout_circuit has been posted

    case "POST_WORK_CIRCUIT_SUCCESSFUL":
      return { ...state, selectedExercise: null };

    //* Fetch Exercises Belonging To User

    case "FETCH_EXERCISES_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_EXERCISES_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_EXERCISES_SUCCESSFUL":
      return { ...state, fetching: false, exercises: action.exercises };

    //* Fetch SHOW Exercise

    case "FETCH_EXERCISE_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_EXERCISE_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_EXERCISE_SUCCESSFUL":
      return { ...state, fetching: false, selectedExercise: action.exercise };

    //* POST New Exercise

    case "POST_EXERCISE_REQUEST":
      return { ...state, fetching: true };
    case "POST_EXERCISE_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_EXERCISE_SUCCESSFUL":
      
      return {
        ...state,
        fetching: false,
        exercises: [...state.exercises, action.exercise],
        selectedExercise: action.exercise,
      };

    //* PATCH exercise

    case "PATCH_EXERCISE_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_EXERCISE_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_EXERCISE_SUCCESSFUL":
      const newExercisesPATCH = [
        ...[
          ...state.exercises.filter(
            (exercise) => exercise.id != action.exercise.id
          ),
        ],
        action.exercise,
      ];
      const sortedPATCH = newExercisesPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        exercises: sortedPATCH,
        selectedExercise: action.exercise,
      };
    //* DESTROY exercise

    case "DELETE_EXERCISE_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_EXERCISE_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_EXERCISE_SUCCESSFUL":
      const newExercisesDESTROY = [
        ...state.exercises.filter(
          (exercise) => exercise.id != action.exercise.id
        ),
      ];
      return { ...state, fetching: false, exercises: newExercisesDESTROY };
    default:
      return state;
  }
};

export default exerciseReducer;
