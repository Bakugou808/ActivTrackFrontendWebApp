const API = "http://localhost:3000/api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// *rxaction -> action template

// ------- CLEAR SELECTED WORKOUT AND FORMATTED WORKOUT FROM STATE ACTIONS--------

export const clearSelectedAndFormattedWorkouts = () => ({
  type: "CLEAR_SELECTED_AND_FORMATTED_WORKOUT_STATE",
});

//

export const showExDrawer = () => ({
  type: "SHOW_EX_DRAWER",
});

// ------- FETCH FOLDER WORKOUTS ACTIONS--------

export const fetchWorkoutsRequest = () => ({
  type: "FETCH_WORKOUTS_REQUEST",
});

export const fetchWorkoutsFailed = (error) => ({
  type: "FETCH_WORKOUTS_FAILED",
  error: error,
});

export const fetchWorkoutsSuccess = (workouts) => ({
  type: "FETCH_WORKOUTS_SUCCESSFUL",
  workouts: workouts,
});

// ------- FETCH FOLDER WORKOUTS FUNCTION--------

export const fetchWorkouts = (folderId) => {
  return (dispatch) => {
    dispatch(fetchWorkoutsRequest());
    fetch(`${API}/folders_workouts/${folderId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchWorkoutsFailed(data.error));
        } else {
          dispatch(fetchWorkoutsSuccess(data));
        }
      });
  };
};

// ------- FETCH SHOW WORKOUT ACTIONS--------

export const fetchWorkoutRequest = () => ({
  type: "FETCH_WORKOUT_REQUEST",
});

export const fetchWorkoutFailed = (error) => ({
  type: "FETCH_WORKOUT_FAILED",
  error: error,
});

export const fetchWorkoutSuccess = (workout) => ({
  type: "FETCH_WORKOUT_SUCCESSFUL",
  workout: workout,
});

// ------- FETCH SHOW WORKOUT FUNCTION--------

export const fetchWorkout = (workoutId) => {
  return (dispatch) => {
    dispatch(fetchWorkoutRequest());
    fetch(`${API}/workouts/${workoutId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchWorkoutFailed(data.error));
        } else {
          dispatch(fetchWorkoutSuccess(data));
        }
      });
  };
};

// ------- FETCH FORMATTED WORKOUT ACTIONS--------

export const fetchFormattedWorkoutRequest = () => ({
  type: "FETCH_FORMATTED_WORKOUT_REQUEST",
});

export const fetchFormattedWorkoutFailed = (error) => ({
  type: "FETCH_FORMATTED_WORKOUT_FAILED",
  error: error,
});

export const fetchFormattedWorkoutSuccess = (workout) => ({
  type: "FETCH_FORMATTED_WORKOUT_SUCCESSFUL",
  workout: workout,
});

// ------- FETCH FORMATTED WORKOUT FUNCTION--------

export const fetchFormattedWorkout = (workoutId) => {
  return (dispatch) => {
    dispatch(fetchFormattedWorkoutRequest());
    fetch(`${API}/formatted_workout/${workoutId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchFormattedWorkoutFailed(data.error));
        } else {
          dispatch(fetchFormattedWorkoutSuccess(data));
        }
      });
  };
};

// ------- POST NEW WORKOUT ACTIONS--------

export const postWorkoutRequest = () => ({
  type: "POST_WORKOUT_REQUEST",
});

export const postWorkoutFailed = (error) => ({
  type: "POST_WORKOUT_FAILED",
  error: error,
});

export const postWorkoutSuccess = (workout) => ({
  type: "POST_WORKOUT_SUCCESSFUL",
  workout: workout,
});

// ------- POST NEW WORKOUT FUNCTION--------

export const postWorkout = (workoutData, redirect) => {
  return (dispatch) => {
    dispatch(postWorkoutRequest());
    fetch(`${API}/workouts`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(workoutData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postWorkoutFailed(data.error));
        } else {
          dispatch(postWorkoutSuccess(data));
          redirect(`${data.title}/${data.id}`);
        }
      });
  };
};

// ------- PATCH NEW WORKOUT ACTIONS--------

export const patchWorkoutRequest = () => ({
  type: "PATCH_WORKOUT_REQUEST",
});

export const patchWorkoutFailed = (error) => ({
  type: "PATCH_WORKOUT_FAILED",
  error: error,
});

export const patchWorkoutSuccess = (workout) => ({
  type: "PATCH_WORKOUT_SUCCESSFUL",
  workout: workout,
});

// ------- PATCH NEW WORKOUT FUNCTION--------

export const patchWorkout = (workoutData, sideEffects = null) => {
  return (dispatch) => {
    dispatch(patchWorkoutRequest());
    fetch(`${API}/workouts/${workoutData.workout.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(workoutData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchWorkoutFailed(data.error));
        } else {
          dispatch(patchWorkoutSuccess(data));
          sideEffects && sideEffects();
        }
      });
  };
};

// ------- DELETE NEW WORKOUT ACTIONS--------

export const deleteWorkoutRequest = () => ({
  type: "DELETE_WORKOUT_REQUEST",
});

export const deleteWorkoutFailed = (error) => ({
  type: "DELETE_WORKOUT_FAILED",
  error: error,
});

export const deleteWorkoutSuccess = (workout) => ({
  type: "DELETE_WORKOUT_SUCCESSFUL",
  workout: workout,
});

// ------- DELETE NEW WORKOUT FUNCTION--------

export const deleteWorkout = (workoutId, sideEffects = null) => {
  return (dispatch) => {
    dispatch(deleteWorkoutRequest());
    fetch(`${API}/workouts/${workoutId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteWorkoutFailed(data.error));
        } else {
          dispatch(deleteWorkoutSuccess(workoutId));
          sideEffects && sideEffects();
        }
      });
  };
};
