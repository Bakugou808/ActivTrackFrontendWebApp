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

// ------- FETCH WORKOUTS CIRC_EXs ACTIONS--------

// export const fetchCircExsRequest = () => ({
//   type: "FETCH_CIRC_EXS_REQUEST",
// });

// export const fetchCircExsFailed = (error) => ({
//   type: "FETCH_CIRC_EXS_FAILED",
//   error: error,
// });

// export const fetchCircExsSuccess = (CircExs) => ({
//   type: "FETCH_CIRC_EXS_SUCCESSFUL",
//   CircExs: CircExs,
// });

// // ------- FETCH WORKOUTS CIRC_EXS FUNCTION--------

// export const fetchCircExs = (circExId) => {
//   return (dispatch) => {
//     dispatch(fetchCircExsRequest());
//     fetch(`${API}/workouts_circuit_exercises/${circExId}`) //!make sure to check this route
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) {
//           dispatch(fetchCircExsFailed(data.error));
//         } else {
//           dispatch(fetchCircExsSuccess(data));
//         }
//       });
//   };
// };

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

export const patchCircEx = (circExData, handleWorkCirc) => {
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
          handleWorkCirc();
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

export const deleteCircEx = (circExId) => {
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
        }
      });
  };
};