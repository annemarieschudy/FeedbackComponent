import {
  GET_APP,
  GET_APPS,
  DATA_LOADING,
  GET_STATS,
  GET_DETAILED_STATS,
  GET_COMMENT_STATS,
  GET_CHART_STATS,
  GET_COMMENTS,
  CLEAR_COMMENTS
} from "../actions/types";

const initialState = {
  app: {},
  apps: {},
  stats: {},
  detailedStats: {},
  chartStats: {},
  commentStats: {},
  comments: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_APP:
      return {
        ...state,
        app: action.payload,
        loading: false
      };
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
        loading: false
      };
    case GET_DETAILED_STATS:
      return {
        ...state,
        detailedStats: action.payload,
        loading: false
      };
    case GET_CHART_STATS:
      return {
        ...state,
        chartStats: action.payload,
        loading: false
      };
    case GET_COMMENT_STATS:
      return {
        ...state,
        commentStats: action.payload,
        loading: false
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
        loading: false
      };
    case GET_APPS:
      return {
        ...state,
        apps: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
