import axios from "axios";
import getPreviousDate from "./helper-functions/dates";

import {
  GET_APP,
  GET_APPS,
  GET_FEEDBACK,
  GET_STATS,
  GET_DETAILED_STATS,
  GET_COMMENT_STATS,
  GET_CHART_STATS,
  GET_COMMENTS,
  GET_ERRORS,
  DATA_LOADING
} from "./types";

//Gets an app by its AppName attribute, takes in a string appName. Returns an app object.
export const getAppByName = appName => dispatch => {
  axios
    .get(`/api/dashboard/app/name/${appName}`)
    .then(res => {
      dispatch({
        type: GET_APP,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Gets an app by its ._id, takes in the string appId, returns an app object.
export const getAppById = appId => dispatch => {
  dispatch(setDataLoading());
  axios
    .get(`/api/dashboard/app/${appId}`)
    .then(res =>
      dispatch({
        type: GET_APP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APP,
        payload: {}
      })
    );
};

//Data loading, set to false when actions are complete
export const setDataLoading = () => {
  return {
    type: DATA_LOADING
  };
};

//Gets the feedback array for an app object, found by param appId.
export const getAllFeedback = appId => dispatch => {
  axios
    .get(`/api/apps/${appId}/feedback`)
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

//Gets all of the app objects in the DB
export const getAllApps = () => dispatch => {
  axios
    .get("/api/dashboard/apps")
    .then(res =>
      dispatch({
        type: GET_APPS,
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

//Returns an object with the total number of ratings, number of positive ratings, number of neutral ratings and number of negative ratings for an app (param appId) and given timeframe (time).
export const getStats = (appId, time) => dispatch => {
  dispatch(setDataLoading());
  axios
    .all([
      axios.get(`/api/dashboard/app/${appId}/all/all/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/all/positive/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/all/neutral/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/all/negative/both/${time}`)
    ])
    .then(
      axios.spread((total, positive, neutral, negative) =>
        dispatch({
          type: GET_STATS,
          payload: {
            total: total.data,
            positive: positive.data,
            neutral: neutral.data,
            negative: negative.data
          }
        })
      )
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get the number of sparks ratings of each value, thumb ratings of each value, and slider ratings of each value for an app (param appId) for a given timeframe (time) and returns them in an object.
export const getDetailedData = (appId, time) => dispatch => {
  dispatch(setDataLoading());
  axios
    .all([
      axios.get(`/api/dashboard/app/${appId}/thumbs/1/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/thumbs/0/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/sparks/5/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/sparks/4/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/sparks/3/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/sparks/2/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/sparks/1/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/slider/5/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/slider/4/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/slider/3/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/slider/2/both/${time}`),
      axios.get(`/api/dashboard/app/${appId}/slider/1/both/${time}`)
    ])
    .then(
      axios.spread(
        (
          thumbup,
          thumbdown,
          spark5,
          spark4,
          spark3,
          spark2,
          spark1,
          slider5,
          slider4,
          slider3,
          slider2,
          slider1
        ) =>
          dispatch({
            type: GET_DETAILED_STATS,
            payload: {
              thumbup: thumbup.data,
              thumbdown: thumbdown.data,
              spark5: spark5.data,
              spark4: spark4.data,
              spark3: spark3.data,
              spark2: spark2.data,
              spark1: spark1.data,
              slider5: slider5.data,
              slider4: slider4.data,
              slider3: slider3.data,
              slider2: slider2.data,
              slider1: slider1.data
            }
          })
      )
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Gets the percentage of positive, negative and neutral reviewers who left comments for a given app and timeframe and returns the percentages in an object.
export const getCommentPercentages = (appId, time) => dispatch => {
  dispatch(setDataLoading());
  axios
    .all([
      axios.get(
        `/api/dashboard/app/${appId}/all/positive/both/${time}/comments/percentage`
      ),
      axios.get(
        `/api/dashboard/app/${appId}/all/neutral/both/${time}/comments/percentage`
      ),
      axios.get(
        `/api/dashboard/app/${appId}/all/negative/both/${time}/comments/percentage`
      )
    ])
    .then(
      axios.spread((positive, neutral, negative) =>
        dispatch({
          type: GET_COMMENT_STATS,
          payload: {
            positive: positive.data,
            neutral: neutral.data,
            negative: negative.data
          }
        })
      )
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Gets the percentage of reviews on a specific date that were of a given value (positive, negative or neutral) for a given app and given array of dates. Returns an object where the keys are the dates and the values are the percentages.
export const getChartStats = (appId, value, dates) => dispatch => {
  dispatch(setDataLoading());
  axios
    .get(`/api/dashboard/app/${appId}/all/${value}/both/chart/${dates}`)
    .then(res =>
      dispatch({
        type: GET_CHART_STATS,
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

//Filters and gets the comments for a given app in a given timeframe. Filtered by value1(all, positive, negative or neutral), value2(null, positive, negative or neutral) and device (mobile, desktop or both). Returns an array of comment objects.
export const getComments = (
  appId,
  value1,
  value2,
  device,
  timeframe
) => dispatch => {
  dispatch(setDataLoading());
  let value;
  if (value2 === null) {
    //getting comments of all values or just one value
    value = value1;
    axios
      .get(
        `/api/dashboard/app/${appId}/all/${value}/${device}/${timeframe}/comments`
      )
      .then(res =>
        dispatch({
          type: GET_COMMENTS,
          payload: res.data
        })
      )
      .catch(err => dispatch({ type: GET_COMMENTS, payload: [] }));
  } else {
    axios
      .all([
        axios.get(
          `/api/dashboard/app/${appId}/all/${value1}/${device}/${timeframe}/comments`
        ),
        axios.get(
          `/api/dashboard/app/${appId}/all/${value2}/${device}/${timeframe}/comments`
        )
      ])
      .then(
        axios.spread((res1, res2) => {
          let response = res1.data;
          response = response.concat(res2.data); //merge the two results
          dispatch({
            type: GET_COMMENTS,
            payload: response
          });
        })
      )
      .catch(err => dispatch({ type: GET_COMMENTS, payload: [] }));
  }
};

//If the comment filters result in no comments (when no values are selected or when no devices are selected) return an empty array.
export const clearComments = (appId, timeframe) => dispatch => {
  dispatch(setDataLoading());
  axios
    .get(`/api/dashboard/app/${appId}/all/all/both/comments`)
    .then(res =>
      dispatch({
        type: GET_COMMENTS,
        payload: []
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
