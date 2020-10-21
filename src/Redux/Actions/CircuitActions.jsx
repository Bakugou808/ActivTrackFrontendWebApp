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
// ------- CLEAR SELECTED CIRCUIT --------
export const clearSelectedCircuit = () => ({
  type: "CLEAR_SELECTED_CIRCUIT",
});

// ------- SET CIRCUIT PHASE --------
export const setPhase = (phase) => ({
  type: "SETTING_PHASE",
  phase: phase,
});

// ------- MODIFY CIRCUIT POSITION ACTIONS--------
export const increasePositionCircuit = () => ({
  type: "INCREASE_POS_CIRCUIT",
});

export const decreasePositionCircuit = () => ({
  type: "DECREASE_POS_CIRCUIT",
});

export const clearPosValCircuit = () => ({
  type: "CLEAR_POS_CIRCUIT_VAL",
});

// ------- FETCH WORKOUTS CIRCUITs ACTIONS--------

export const fetchCircuitsRequest = () => ({
  type: "FETCH_CIRCUITS_REQUEST",
});

export const fetchCircuitsFailed = (error) => ({
  type: "FETCH_CIRCUITS_FAILED",
  error: error,
});

export const fetchCircuitsSuccess = (Circuits) => ({
  type: "FETCH_CIRCUITS_SUCCESSFUL",
  Circuits: Circuits,
});

// ------- FETCH WORKOUTS CIRCUITS FUNCTION--------

export const fetchCircuits = (circuitId) => {
  return (dispatch) => {
    dispatch(fetchCircuitsRequest());
    fetch(`${API}/workouts_circuits/${circuitId}`) //!make sure to check this route
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchCircuitsFailed(data.error));
        } else {
          dispatch(fetchCircuitsSuccess(data));
        }
      });
  };
};

// ------- FETCH SHOW CIRCUIT ACTIONS--------

export const fetchCircuitRequest = () => ({
  type: "FETCH_CIRCUIT_REQUEST",
});

export const fetchCircuitFailed = (error) => ({
  type: "FETCH_CIRCUIT_FAILED",
  error: error,
});

export const fetchCircuitSuccess = (circuit) => ({
  type: "FETCH_CIRCUIT_SUCCESSFUL",
  circuit: circuit,
});

// ------- FETCH SHOW CIRCUIT FUNCTION--------

export const fetchCircuit = (circuitId) => {
  return (dispatch) => {
    dispatch(fetchCircuitRequest());
    fetch(`${API}/circuits/${circuitId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchCircuitFailed(data.error));
        } else {
          dispatch(fetchCircuitSuccess(data));
        }
      });
  };
};

// ------- POST NEW CIRCUIT ACTIONS--------

export const postCircuitRequest = () => ({
  type: "POST_CIRCUIT_REQUEST",
});

export const postCircuitFailed = (error) => ({
  type: "POST_CIRCUIT_FAILED",
  error: error,
});

export const postCircuitSuccess = (circuit) => ({
  type: "POST_CIRCUIT_SUCCESSFUL",
  circuit: circuit,
});

// ------- POST NEW CIRCUIT FUNCTION--------

export const postCircuit = (circuitData) => {
  return (dispatch) => {
    dispatch(postCircuitRequest());
    fetch(`${API}/circuits`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(circuitData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postCircuitFailed(data.error));
        } else {
          dispatch(postCircuitSuccess(data));
          dispatch(increasePositionCircuit());
        }
      });
  };
};

// ------- PATCH NEW CIRCUIT ACTIONS--------

export const patchCircuitRequest = () => ({
  type: "PATCH_CIRCUIT_REQUEST",
});

export const patchCircuitFailed = (error) => ({
  type: "PATCH_CIRCUIT_FAILED",
  error: error,
});

export const patchCircuitSuccess = (circuit) => ({
  type: "PATCH_CIRCUIT_SUCCESSFUL",
  circuit: circuit,
});

// ------- PATCH NEW CIRCUIT FUNCTION--------

export const patchCircuit = (circuitData, sideEffects) => {
  return (dispatch) => {
    dispatch(patchCircuitRequest());
    fetch(`${API}/circuits/${circuitData.circuit.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(circuitData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchCircuitFailed(data.error));
        } else {
          dispatch(patchCircuitSuccess(data));
          sideEffects();
        }
      });
  };
};

// ------- DELETE NEW CIRCUIT ACTIONS--------

export const deleteCircuitRequest = () => ({
  type: "DELETE_CIRCUIT_REQUEST",
});

export const deleteCircuitFailed = (error) => ({
  type: "DELETE_CIRCUIT_FAILED",
  error: error,
});

export const deleteCircuitSuccess = (circuitId) => ({
  type: "DELETE_CIRCUIT_SUCCESSFUL",
  circuitId: circuitId,
});

// ------- DELETE NEW CIRCUIT FUNCTION--------

export const deleteCircuit = (circuitId) => {
  return (dispatch) => {
    dispatch(deleteCircuitRequest());
    fetch(`${API}/circuits/${circuitId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteCircuitFailed(data.error));
        } else {
          dispatch(deleteCircuitSuccess(circuitId));
        }
      });
  };
};
