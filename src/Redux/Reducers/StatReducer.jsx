// *rxreducer

const initialState = {
  selectedStat: null,
  // * may not need this. formattedStat: null,
  workoutsStats: [],
  stats: [],
  fetching: false,
  error: false,
};

const statReducer = (state = initialState, action) => {
  switch (action.type) {
    //* Set Selected Stat
    case "SET_SELECTED_STAT":
      return { ...state, selectedStat: action.stat };
    //* Set Stats Based On Selected Folder
    case "FETCH_FOLDER_SUCCESSFUL":
      return { ...state, stats: action.folder.stats };

    // * Clear Selected Stat and Formatted Stat State
    case "CLEAR_SELECTED_AND_FORMATTED_STAT_STATE":
      return { ...state, selectedStat: null, formattedStat: null };

    //* Fetch Workouts Stats Belonging

    case "FETCH_WORKOUTS_STATS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_WORKOUTS_STATS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_WORKOUTS_STATS_SUCCESSFUL":
      return { ...state, fetching: false, workoutsStats: action.stats };

    //* Fetch Stats Belonging To User

    case "FETCH_STATS_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_STATS_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_STATS_SUCCESSFUL":
      return { ...state, fetching: false, stats: action.stats };

    //* Fetch SHOW Stat

    case "FETCH_STAT_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_STAT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_STAT_SUCCESSFUL":
      return { ...state, fetching: false, selectedStat: action.stat };

    //* Fetch FORMATTED Stat

    case "FETCH_FORMATTED_STAT_REQUEST":
      return { ...state, fetching: true };
    case "FETCH_FORMATTED_STAT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "FETCH_FORMATTED_STAT_SUCCESSFUL":
      return { ...state, fetching: false, formattedStat: action.stat };

    //* POST New Stat

    case "POST_STAT_REQUEST":
      return { ...state, fetching: true };
    case "POST_STAT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "POST_STAT_SUCCESSFUL":
      // const newStatsPOST = [...state.stats, action.stat];
      //   return { ...state, fetching: false, stats: newStatsPOST };
      if (state.stats) {
        return {
          ...state,
          fetching: false,
          stats: [...state.stats, action.stat],
          selectedStat: action.stat,
        };
      } else {
        return {
          ...state,
          fetching: false,
          stats: [action.stat],
          selectedStat: action.stat,
        };
      }

    //* PATCH stat

    case "PATCH_STAT_REQUEST":
      return { ...state, fetching: true };
    case "PATCH_STAT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "PATCH_STAT_SUCCESSFUL":
      const newStatsPATCH = [
        ...[...state.stats.filter((stat) => stat.id != action.stat.id)],
        action.stat,
      ];
      const sortedPATCH = newStatsPATCH.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return {
        ...state,
        fetching: false,
        stats: sortedPATCH,
        selectedStat: action.stat,
      };
    //* DESTROY stat

    case "DELETE_STAT_REQUEST":
      return { ...state, fetching: true };
    case "DELETE_STAT_FAILED":
      return { ...state, fetching: false, error: action.error };
    case "DELETE_STAT_SUCCESSFUL":
      const newStatsDESTROY = [
        ...state.stats.filter((stat) => stat.id != action.stat.id),
      ];
      return { ...state, fetching: false, stats: newStatsDESTROY };
    default:
      return state;
  }
};

export default statReducer;
