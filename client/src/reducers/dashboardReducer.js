import { GET_APP, DATA_LOADING } from "../actions/types";

const initialState = {
  app: {},
  loading: false
};

export default function(state = initialState, action) {
  console.log(action.type);

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
    default:
      return state;
  }
}
