import axios from "axios";

const GET_ERRORS = "GET_ERRORS";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const GET_FEEDBACK = "GET_FEEDBACK";

// Creates the app in the database if it does not already exist and saves the ID in local storage
// Initializes a feedback unit and sets the appId to the app created.
// Called as soon as the feedback component mounts for the first time
export const addApp = appData => dispatch => {
  axios
    .post("/api/apps/add", appData)
    .then(res => {
      const appId = res.data._id;
      localStorage.setItem("appId", appId);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add a unit of feedback to the feedback array of the current app.
//Thumb ratings will be either 0 (thumbs down) or 1 (thumbs up)
//Spark ratings will be 1-5
//Slider ratings will be 1-5
//Ratings of null or -1 mean the user did not give feedback
export const rateApp = ratingData => dispatch => {
  axios
    .post(`/api/feedback/rate`, ratingData)
    .then(res => {
      axios.post(`/api/apps/${ratingData.app}/current`).then(res2 => {
        localStorage.setItem("feedbackId", res2.data);
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const saveFeedbackToLocalStorage = appId => dispatch => {
  dispatch(clearErrors());

  //get the current unit of feedback to update
  axios
    .post(`/api/apps/${appId}/current`)
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update a unit of feedback with contact information
export const contactInfo = contactData => dispatch => {
  dispatch(clearErrors());
  const feedbackId = localStorage.getItem("feedbackId");
  axios
    .post(`/api/feedback/${feedbackId}/contact`, contactData)
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update a unit of feedback with a comment
export const addComment = comment => dispatch => {
  dispatch(clearErrors());
  const feedbackId = localStorage.getItem("feedbackId");

  axios
    .post(`/api/feedback/${feedbackId}/comment`, comment)
    .then(res => {})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Get the current unit of feedback by the ID saved in local storage
export const getFeedback = feedbackId => dispatch => {
  axios
    .get(`/api/feedback/${feedbackId}`)
    .then(res =>
      dispatch({
        type: GET_FEEDBACK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all feedback in the feedback array of the specified app.
export const getAllFeedback = appId => dispatch => {
  axios
    .get(`/api/apps/${appId}/feedback`)
    .then(res => {
      return res.data;
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
