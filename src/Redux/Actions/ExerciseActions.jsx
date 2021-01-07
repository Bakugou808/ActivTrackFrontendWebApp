const API = "http://localhost:3000/api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};


// ------- Clear selectedExercise ACTION--------

export const clearSelectedExercise = () => ({
  type: "CLEAR_SELECTED_EXERCISE",
});

// ------- FETCH USERS EXERCISES ACTIONS--------
export const fetchExercisesRequest = () => ({
  type: "FETCH_EXERCISES_REQUEST",
});

export const fetchExercisesFailed = (error) => ({
  type: "FETCH_EXERCISES_FAILED",
  error: error,
});

export const fetchExercisesSuccess = (exercises) => ({
  type: "FETCH_EXERCISES_SUCCESSFUL",
  exercises: exercises,
});

// ------- FETCH USERS EXERCISES FUNCTION--------

export const fetchExercises = (userId) => {
  return (dispatch) => {
    dispatch(fetchExercisesRequest());
    fetch(`${API}/users_exercises/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchExercisesFailed(data.error));
        } else {
          dispatch(fetchExercisesSuccess(data));
        }
      });
  };
};

// ------- FETCH SHOW EXERCISE ACTIONS--------

export const fetchExerciseRequest = () => ({
  type: "FETCH_EXERCISE_REQUEST",
});

export const fetchExerciseFailed = (error) => ({
  type: "FETCH_EXERCISE_FAILED",
  error: error,
});

export const fetchExerciseSuccess = (exercise) => ({
  type: "FETCH_EXERCISE_SUCCESSFUL",
  exercise: exercise,
});

// ------- FETCH SHOW EXERCISE FUNCTION--------

export const fetchExercise = (exerciseId) => {
  return (dispatch) => {
    dispatch(fetchExerciseRequest());
    fetch(`${API}/exercises/${exerciseId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchExerciseFailed(data.error));
        } else {
          dispatch(fetchExerciseSuccess(data));
        }
      });
  };
};

// ------- POST NEW EXERCISE ACTIONS--------

export const postExerciseRequest = () => ({
  type: "POST_EXERCISE_REQUEST",
});

export const postExerciseFailed = (error) => ({
  type: "POST_EXERCISE_FAILED",
  error: error,
});

export const postExerciseSuccess = (exercise) => ({
  type: "POST_EXERCISE_SUCCESSFUL",
  exercise: exercise,
});

// ------- POST NEW EXERCISE FUNCTION--------

export const postExercise = (exerciseData) => {
  return (dispatch) => {
    dispatch(postExerciseRequest());
    fetch(`${API}/exercises`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(exerciseData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postExerciseFailed(data.error));
        } else {
          dispatch(postExerciseSuccess(data));
        }
      });
  };
};

// ------- PATCH NEW EXERCISE ACTIONS--------

export const patchExerciseRequest = () => ({
  type: "PATCH_EXERCISE_REQUEST",
});

export const patchExerciseFailed = (error) => ({
  type: "PATCH_EXERCISE_FAILED",
  error: error,
});

export const patchExerciseSuccess = (exercise) => ({
  type: "PATCH_EXERCISE_SUCCESSFUL",
  exercise: exercise,
});

// ------- PATCH NEW EXERCISE FUNCTION--------

export const patchExercise = (exerciseData, sideEffects = null) => {
  return (dispatch) => {
    dispatch(patchExerciseRequest());
    fetch(`${API}/exercises/${exerciseData.exercise.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(exerciseData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchExerciseFailed(data.error));
        } else {
          dispatch(patchExerciseSuccess(data));
          sideEffects && sideEffects();
        }
      });
  };
};

// ------- DELETE NEW EXERCISE ACTIONS--------

export const deleteExerciseRequest = () => ({
  type: "DELETE_EXERCISE_REQUEST",
});

export const deleteExerciseFailed = (error) => ({
  type: "DELETE_EXERCISE_FAILED",
  error: error,
});

export const deleteExerciseSuccess = (exercise) => ({
  type: "DELETE_EXERCISE_SUCCESSFUL",
  exercise: exercise,
});

// ------- DELETE NEW EXERCISE FUNCTION--------

export const deleteExercise = (exerciseId) => {
  return (dispatch) => {
    dispatch(deleteExerciseRequest());
    fetch(`${API}/exercises/${exerciseId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteExerciseFailed(data.error));
        } else {
          dispatch(deleteExerciseSuccess(exerciseId));
        }
      });
  };
};
