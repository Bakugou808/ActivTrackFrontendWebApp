const API = "https://activtrack-api.herokuapp.com//api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};

// ------- Clear selectedCircEx ACTION--------

export const clearSelectedCircEx = () => ({
  type: "CLEAR_SELECTED_CIRC_EX",
});

// ------- MODIFY CIRC_EX POSITION ACTIONS--------
export const increasePositionCircEx = () => ({
  type: "INCREASE_POS_CIRC_EX",
});

export const decreasePositionCircEx = () => ({
  type: "DECREASE_POS_CIRC_EX",
});

export const clearPosValCircEx = () => ({
  type: "CLEAR_POS_CIRC_EX_VAL",
});

// ------- FETCH SHOW CIRC_EX ACTIONS--------

export const fetchCircExRequest = () => ({
  type: "FETCH_CIRC_EX_REQUEST",
});

export const fetchCircExFailed = (error) => ({
  type: "FETCH_CIRC_EX_FAILED",
  error: error,
});

export const fetchCircExSuccess = (circEx) => ({
  type: "FETCH_CIRC_EX_SUCCESSFUL",
  circEx: circEx,
});

// ------- FETCH SHOW CIRC_EX FUNCTION--------

export const fetchCircEx = (circExId) => {
  return (dispatch) => {
    dispatch(fetchCircExRequest());
    fetch(`${API}/circuit_exercises/${circExId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchCircExFailed(data.error));
        } else {
          dispatch(fetchCircExSuccess(data));
        }
      });
  };
};

// ------- POST NEW CIRC_EX ACTIONS--------

export const postCircExRequest = () => ({
  type: "POST_CIRC_EX_REQUEST",
});

export const postCircExFailed = (error) => ({
  type: "POST_CIRC_EX_FAILED",
  error: error,
});

export const postCircExSuccess = (circEx) => ({
  type: "POST_CIRC_EX_SUCCESSFUL",
  circEx: circEx,
});

// ------- POST NEW CIRC_EX FUNCTION--------

export const postCircEx = (circExData, goToNextPage) => {
  return (dispatch) => {
    dispatch(postCircExRequest());
    fetch(`${API}/circuit_exercises`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(circExData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postCircExFailed(data.error));
        } else {
          dispatch(postCircExSuccess(data));
          goToNextPage(true);
        }
      });
  };
};

// ------- PATCH NEW CIRC_EX ACTIONS--------

export const patchCircExRequest = () => ({
  type: "PATCH_CIRC_EX_REQUEST",
});

export const patchCircExFailed = (error) => ({
  type: "PATCH_CIRC_EX_FAILED",
  error: error,
});

export const patchCircExSuccess = (circEx) => ({
  type: "PATCH_CIRC_EX_SUCCESSFUL",
  circEx: circEx,
});

// ------- PATCH NEW CIRC_EX FUNCTION--------

export const patchCircEx = (circExData, sideEffects = false) => {
  return (dispatch) => {
    dispatch(patchCircExRequest());
    fetch(`${API}/circuit_exercises/${circExData.circuit_exercise.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(circExData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchCircExFailed(data.error));
        } else {
          dispatch(patchCircExSuccess(data));
          sideEffects && sideEffects();
        }
      });
  };
};

// ------- DELETE NEW CIRC_EX ACTIONS--------

export const deleteCircExRequest = () => ({
  type: "DELETE_CIRC_EX_REQUEST",
});

export const deleteCircExFailed = (error) => ({
  type: "DELETE_CIRC_EX_FAILED",
  error: error,
});

export const deleteCircExSuccess = (circExId) => ({
  type: "DELETE_CIRC_EX_SUCCESSFUL",
  circExId: circExId,
});

// ------- DELETE NEW CIRC_EX FUNCTION--------

export const deleteCircEx = (circExId, sideEffects) => {
  return (dispatch) => {
    dispatch(deleteCircExRequest());
    fetch(`${API}/circuit_exercises/${circExId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteCircExFailed(data.error));
        } else {
          dispatch(deleteCircExSuccess(circExId));
          sideEffects && sideEffects();
        }
      });
  };
};
