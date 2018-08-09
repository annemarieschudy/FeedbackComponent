const GET_FEEDBACK = "GET_FEEDBACK";

const initialState = {
  feedback: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload
      };
    default:
      return state;
  }
}
