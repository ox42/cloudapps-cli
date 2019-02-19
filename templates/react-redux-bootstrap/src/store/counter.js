export const RESET_COUNTER = 'counter/RESET_COUNTER';
export const ADD_VALUE = 'counter/ADD_VALUE';

const initialState = {
  counter: 0,
  lastAddition: null
};

export default (state = initialState, action) => {

  switch (action.type) {
    case RESET_COUNTER:
      return {
        ...state,

        counter: 0,
        lastAddition: null
      };

    case ADD_VALUE:
      return {
        ...state,

        counter: state.counter + action.value,
        lastAddition: action.value
      };

    default:
      return state
  }
}




export const resetCounter = () => {

  return dispatch => {
    dispatch({
      type: RESET_COUNTER
    });
  }
};



export const addValue = (value) => {

  return dispatch => {
    dispatch({
      type: ADD_VALUE,
      value: value
    });
  }
};