const API = "https://activtrack-api.herokuapp.com/api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// ------- FETCH SHOW WORK_CIRCUIT ACTIONS--------

export const fetchWorkCircuitRequest = () => ({
  type: "FETCH_WORK_CIRCUIT_REQUEST",
});

export const fetchWorkCircuitFailed = (error) => ({
  type: "FETCH_WORK_CIRCUIT_FAILED",
  error: error,
});

export const fetchWorkCircuitSuccess = (workCircuit) => ({
  type: "FETCH_WORK_CIRCUIT_SUCCESSFUL",
  workCircuit: workCircuit,
});

// ------- FETCH SHOW WORK_CIRCUIT FUNCTION--------

export const fetchWorkCircuit = (workCircuitId) => {
  return (dispatch) => {
    dispatch(fetchWorkCircuitRequest());
    fetch(`${API}/workout_circuits/${workCircuitId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchWorkCircuitFailed(data.error));
        } else {
          dispatch(fetchWorkCircuitSuccess(data));
        }
      });
  };
};

// ------- POST NEW WORK_CIRCUIT ACTIONS--------

export const postWorkCircuitRequest = () => ({
  type: "POST_WORK_CIRCUIT_REQUEST",
});

export const postWorkCircuitFailed = (error) => ({
  type: "POST_WORK_CIRCUIT_FAILED",
  error: error,
});

export const postWorkCircuitSuccess = (workCircuit) => ({
  type: "POST_WORK_CIRCUIT_SUCCESSFUL",
  workCircuit: workCircuit,
});

// ------- POST NEW WORK_CIRCUIT FUNCTION--------

export const postWorkCircuit = (workCircuitData, sideEffects) => {
  return (dispatch) => {
    dispatch(postWorkCircuitRequest());
    fetch(`${API}/workout_circuits`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(workCircuitData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postWorkCircuitFailed(data.error));
        } else {
          dispatch(postWorkCircuitSuccess(data));
          sideEffects();
        }
      });
  };
};

// ------- PATCH NEW WORK_CIRCUIT ACTIONS--------

export const patchWorkCircuitRequest = () => ({
  type: "PATCH_WORK_CIRCUIT_REQUEST",
});

export const patchWorkCircuitFailed = (error) => ({
  type: "PATCH_WORK_CIRCUIT_FAILED",
  error: error,
});

export const patchWorkCircuitSuccess = (workCircuit) => ({
  type: "PATCH_WORK_CIRCUIT_SUCCESSFUL",
  workCircuit: workCircuit,
});

// ------- PATCH NEW WORK_CIRCUIT FUNCTION--------

export const patchWorkCircuit = (workCircuitData) => {
  return (dispatch) => {
    dispatch(patchWorkCircuitRequest());
    fetch(`${API}/workout_circuits/${workCircuitData.circuit_exercise.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(workCircuitData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchWorkCircuitFailed(data.error));
        } else {
          dispatch(patchWorkCircuitSuccess(data));
        }
      });
  };
};

// ------- DELETE NEW WORK_CIRCUIT ACTIONS--------

export const deleteWorkCircuitRequest = () => ({
  type: "DELETE_WORK_CIRCUIT_REQUEST",
});

export const deleteWorkCircuitFailed = (error) => ({
  type: "DELETE_WORK_CIRCUIT_FAILED",
  error: error,
});

export const deleteWorkCircuitSuccess = (workCircuitId) => ({
  type: "DELETE_WORK_CIRCUIT_SUCCESSFUL",
  workCircuitId: workCircuitId,
});

// ------- DELETE NEW WORK_CIRCUIT FUNCTION--------

export const deleteWorkCircuit = (workCircuitId) => {
  return (dispatch) => {
    dispatch(deleteWorkCircuitRequest());
    fetch(`${API}/workout_circuits/${workCircuitId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteWorkCircuitFailed(data.error));
        } else {
          dispatch(deleteWorkCircuitSuccess(workCircuitId));
        }
      });
  };
};
