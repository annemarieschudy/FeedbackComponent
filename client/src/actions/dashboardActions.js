import axios from "axios";

import {
  GET_APP,
  GET_APPS,
  GET_FEEDBACK,
  GET_ERRORS,
  DATA_LOADING
} from "./types";

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

//Data loading
export const setDataLoading = () => {
  return {
    type: DATA_LOADING
  };
};

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

export const getPercentageOf = (appId, type, value, time) => dispatch => {
  axios
    .get(`/api/dashboard/app/${appId}/${type}/${value}/${time}/percentage`)
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

export const getCountOf = (appId, type, value, time) => dispatch => {
  axios
    .get(`/api/dashboard/app/${appId}/${type}/${value}/${time}`)
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
