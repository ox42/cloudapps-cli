import { push } from 'connected-react-router';
import request from '../lib/request.js';

export const SIGNIN_USER_STARTED = 'auth/SIGNIN_USER_STARTED';
export const SIGNIN_USER_FAILED = 'auth/SIGNIN_USER_FAILED';
export const SIGNIN_USER_FINISHED = 'auth/SIGNIN_USER_FINISHED';

export const SIGNUP_USER_STARTED = 'auth/SIGNUP_USER_STARTED';
export const SIGNUP_USER_FAILED = 'auth/SIGNUP_USER_FAILED';
export const SIGNUP_USER_FINISHED = 'auth/SIGNUP_USER_FINISHED';

export const LOGOUT_USER = 'auth/LOGOUT_USER';

let isAuthenticated = localStorage.getItem('App-Authentication-Token') ? true : false;
const initialState = {
  isAuthenticated: isAuthenticated,

  pendingAuthRequest: false,
  failedAuthRequest: false,

  lastError: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case SIGNIN_USER_STARTED:
    case SIGNUP_USER_STARTED:
      return {
        ...state,

        lastError: null,
        isAuthenticated: false,
        pendingAuthRequest: true,
        failedAuthRequest: false
      };

    case SIGNIN_USER_FAILED:
    case SIGNUP_USER_FAILED:
      return {
        ...state,

        lastError: action.error,
        isAuthenticated: false,
        pendingAuthRequest: false,
        failedAuthRequest: true
      };

    case SIGNIN_USER_FINISHED:
    case SIGNUP_USER_FINISHED:
      return {
        ...state,

        lastError: null,
        isAuthenticated: true,
        pendingAuthRequest: false,
        failedAuthRequest: false
      };


    case LOGOUT_USER:
      return {
        ...state,

        lastError: null,
        isAuthenticated: false,
        pendingAuthRequest: false,
        failedAuthRequest: false
      };

    default:
      return state
  }
}




export const signUpUser = (name, email, password) => {

  return dispatch => {
    dispatch({
      type: SIGNUP_USER_STARTED
    });

    return request.post('/Account', { name, email, password })
        .then(({ data }) => {

          //set the authentication token
          if (data.Authentication) {
            localStorage.setItem('App-Authentication-Token', data.Authentication);

            dispatch({
              type: SIGNUP_USER_FINISHED
            });

            dispatch(push('/user/dashboard'));
          } else {

            dispatch({
              type: SIGNUP_USER_FAILED,
              error: 'No authentication token received from server.'
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: SIGNUP_USER_FAILED,
            error: (error.response && error.response.data ? error.response.data.message : error) || error
          });
        });
  }
};



export const signInUser = (email, password) => {

  return dispatch => {
    dispatch({
      type: SIGNIN_USER_STARTED
    });

    return request.post('/Account/login', { email, password })
        .then(({ data }) => {

          //set the authentication token
          if (data.Authentication) {
            localStorage.setItem('App-Authentication-Token', data.Authentication);

            dispatch({
              type: SIGNIN_USER_FINISHED
            });

            dispatch(push('/user/dashboard'));
          } else {

            dispatch({
              type: SIGNIN_USER_FAILED,
              error: 'No authentication token received from server.'
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: SIGNIN_USER_FAILED,
            error: (error.response && error.response.data ? error.response.data.error : error) || error
          });
        });
  }
};



export const logoutUser = () => {

  return dispatch => {
    localStorage.removeItem('App-Authentication-Token');

    dispatch(push('/'));

    dispatch({
      type: LOGOUT_USER
    });
  }
};
