const API = "http://localhost:3000/api/v1";
const token = () => localStorage.getItem("token");
export const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token(),
  };
};


export const clearFoldersState = () => ({
  type: "CLEAR_FOLDERS_FROM_STATE",
});

// ------- SET SELECTED FOLDER ACTIONS--------
export const setSelectedFolder = (folder) => ({
  type: "SET_SELECTED_FOLDER",
  folder: folder,
});

// ------- FETCH USER FOLDERS ACTIONS--------

export const fetchFoldersRequest = () => ({
  type: "FETCH_FOLDERS_REQUEST",
});

export const fetchFoldersFailed = (error) => ({
  type: "FETCH_FOLDERS_FAILED",
  error: error,
});

export const fetchFoldersSuccess = (folders) => ({
  type: "FETCH_FOLDERS_SUCCESSFUL",
  folders: folders,
});

// ------- FETCH USER FOLDERS FUNCTION--------

export const fetchFolders = (userId) => {
  return (dispatch) => {
    dispatch(fetchFoldersRequest());
    fetch(`${API}/folders/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchFoldersFailed(data.error));
        } else {
          dispatch(fetchFoldersSuccess(data));
        }
      });
  };
};

// ------- FETCH SHOW FOLDER ACTIONS--------

export const fetchFolderRequest = () => ({
  type: "FETCH_FOLDER_REQUEST",
});

export const fetchFolderFailed = (error) => ({
  type: "FETCH_FOLDER_FAILED",
  error: error,
});

export const fetchFolderSuccess = (folder) => ({
  type: "FETCH_FOLDER_SUCCESSFUL",
  folder: folder,
});

// ------- FETCH SHOW FOLDER FUNCTION--------

export const fetchFolder = (folderId) => {
  return (dispatch) => {
    dispatch(fetchFolderRequest());
    fetch(`${API}/folders/${folderId}`, {
      method: "GET",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(fetchFolderFailed(data.error));
        } else {
          dispatch(fetchFolderSuccess(data));
        }
      });
  };
};

// ------- POST NEW FOLDER ACTIONS--------

export const postFolderRequest = () => ({
  type: "POST_FOLDER_REQUEST",
});

export const postFolderFailed = (error) => ({
  type: "POST_FOLDER_FAILED",
  error: error,
});

export const postFolderSuccess = (folder) => ({
  type: "POST_FOLDER_SUCCESSFUL",
  folder: folder,
});

// ------- POST NEW FOLDER FUNCTION--------

export const postFolder = (folderData, setShowForm) => {
  return (dispatch) => {
    dispatch(postFolderRequest());
    fetch(`${API}/folders`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(folderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(postFolderFailed(data.error));
        } else {
          dispatch(postFolderSuccess(data));
          setShowForm(false);
        }
      });
  };
};

// ------- PATCH NEW FOLDER ACTIONS--------

export const patchFolderRequest = () => ({
  type: "PATCH_FOLDER_REQUEST",
});

export const patchFolderFailed = (error) => ({
  type: "PATCH_FOLDER_FAILED",
  error: error,
});

export const patchFolderSuccess = (folder) => ({
  type: "PATCH_FOLDER_SUCCESSFUL",
  folder: folder,
});

// ------- PATCH NEW FOLDER FUNCTION--------

export const patchFolder = (folderData, sideEffects) => {
  return (dispatch) => {
    dispatch(patchFolderRequest());
    fetch(`${API}/folders/${folderData.folder.id}`, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(folderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(patchFolderFailed(data.error));
        } else {
          dispatch(patchFolderSuccess(data));
          sideEffects();
        }
      });
  };
};

// ------- DELETE NEW FOLDER ACTIONS--------

export const deleteFolderRequest = () => ({
  type: "DELETE_FOLDER_REQUEST",
});

export const deleteFolderFailed = (error) => ({
  type: "DELETE_FOLDER_FAILED",
  error: error,
});

export const deleteFolderSuccess = (folder) => ({
  type: "DELETE_FOLDER_SUCCESSFUL",
  folder: folder,
});

// ------- DELETE NEW FOLDER FUNCTION--------

export const deleteFolder = (folderId, sideEffects = null) => {
  return (dispatch) => {
    dispatch(deleteFolderRequest());
    fetch(`${API}/folders/${folderId}`, {
      method: "DELETE",
      headers: headers(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteFolderFailed(data.error));
        } else {
          dispatch(deleteFolderSuccess(folderId));
          sideEffects && sideEffects();
        }
      });
  };
};
