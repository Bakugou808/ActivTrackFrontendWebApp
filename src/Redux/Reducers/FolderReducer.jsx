// *rxreducer

const initialState = {
  folders: [],
  fetching: false,
  error: false,
};

const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    //* Fetch Folders Belonging To User

    case "FETCH_FOLDERS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_FOLDERS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_FOLDERS_SUCCESSFUL":
      return { ...state, fetching: false, folders: action.folders };

    //* POST New Folder

    case "POST_FOLDER_REQUEST":
      return { ...state, fetching: true };
    case "POST_FOLDER_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_FOLDER_SUCCESSFUL":
      const newFoldersPOST = [...state.folders, action.folder];
      return { ...state, fetching: false, folders: newFoldersPOST };

    //* PATCH folder

    case "PATCH_FOLDER_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_FOLDER_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_FOLDER_SUCCESSFUL":
      const newFoldersPATCH = [
        ...[...state.folders.filter((folder) => folder.id != action.folder.id)],
        action.folder,
      ];
      const sortedPATCH = newFoldersPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return { ...state, fetching: false, folders: sortedPATCH };
    //* DESTROY folder

    case "DELETE_FOLDER_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_FOLDER_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_FOLDER_SUCCESSFUL":
      const newFoldersDESTROY = [
        ...state.folders.filter((folder) => folder.id != action.folder.id),
      ];
      return { ...state, fetching: false, folders: newFoldersDESTROY };
    default:
      return state;
  }
};

export default folderReducer;
