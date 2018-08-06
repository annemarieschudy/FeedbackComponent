const GET_FEEDBACK = "GET_FEEDBACK";

const initialState = {
  feedback: null,
  app: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACK:
      return {
        ...state
      };
    default:
      return state;
  }
}
