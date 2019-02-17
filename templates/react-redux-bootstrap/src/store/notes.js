import request from '../lib/request.js';
import { push } from 'connected-react-router';

export const LOAD_NOTES_STARTED = 'notes/LOAD_NOTES_STARTED';
export const LOAD_NOTES_FAILED = 'notes/LOAD_NOTES_FAILED';
export const LOAD_NOTES_FINISHED = 'notes/LOAD_NOTES_FINISHED';

export const CREATE_NOTE_STARTED = 'notes/CREATE_NOTE_STARTED';
export const CREATE_NOTE_FAILED = 'notes/CREATE_NOTE_FAILED';
export const CREATE_NOTE_FINISHED = 'notes/CREATE_NOTE_FINISHED';

export const EDIT_NOTE_STARTED = 'notes/EDIT_NOTE_STARTED';
export const EDIT_NOTE_FAILED = 'notes/EDIT_NOTE_FAILED';
export const EDIT_NOTE_FINISHED = 'notes/EDIT_NOTE_FINISHED';


const initialState = {
  notes: null,

  isLoadingNotes: false,
  failedLoadingNotes: false,

  isUpdatingNote: false,
  failedUpdatingNote: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTES_STARTED:
      return {
        ...state,
        notes: null,
        isLoadingNotes: true,
        failedLoadingNotes: false
      };

    case LOAD_NOTES_FAILED:
      return {
        ...state,
        notes: null,
        isLoadingNotes: false,
        failedLoadingNotes: true
      };

    case LOAD_NOTES_FINISHED:
      return {
        ...state,
        notes: action.notes,
        isLoadingNotes: false,
        failedLoadingNotes: false
      };



    case CREATE_NOTE_STARTED:
    case EDIT_NOTE_STARTED:
      return {
        ...state,
        isUpdatingNote: true,
        failedUpdatingNote: false
      };

    case CREATE_NOTE_FAILED:
    case EDIT_NOTE_FAILED:
      return {
        ...state,
        isUpdatingNote: false,
        failedUpdatingNote: true
      };

    case CREATE_NOTE_FINISHED:
      return {
        ...state,
        notes: [...state.notes, action.note ],
        isUpdatingNote: false,
        failedUpdatingNote: false
      };

    case EDIT_NOTE_FINISHED:
      return {
        ...state,
        notes: state.notes.slice().map(current => {
          if (current.id === action.note.id) {
            return action.note;
          } else {
            return current;
          }
        }),

        isUpdatingNote: false,
        failedUpdatingNote: false
      };

    default:
      return state
  }
}


export const loadNotes = () => {

  return dispatch => {
    dispatch({
      type: LOAD_NOTES_STARTED
    });

    let authenticationToken = localStorage.getItem('App-Authentication-Token');
    return request.get('/Note', { headers: { Authentication: authenticationToken } })
        .then(({ data }) => {

          //simulate delay, for loading effect
          setTimeout(() => {

            dispatch({
              type: LOAD_NOTES_FINISHED,
              notes: data
            });
          }, 1500);
        })
        .catch((error) => {
          dispatch({
            type: LOAD_NOTES_FAILED
          });
        });
  }
};


export const createNote = (title, content) => {

  return dispatch => {
    dispatch({
      type: CREATE_NOTE_STARTED
    });

    let authenticationToken = localStorage.getItem('App-Authentication-Token');
    return request.post('/Note', { title, content }, { headers: { Authentication: authenticationToken } })
        .then(({ data }) => {

          dispatch({
            type: CREATE_NOTE_FINISHED,
            note: data
          });

          dispatch(push('/user/dashboard'));
        })
        .catch((error) => {
          dispatch({
            type: CREATE_NOTE_FAILED
          });
        });
  }

};

export const updateNote = (noteId, title, content) => {

  return dispatch => {
    dispatch({
      type: EDIT_NOTE_STARTED
    });

    let authenticationToken = localStorage.getItem('App-Authentication-Token');
    return request.put('/Note/' + noteId, { title, content }, { headers: { Authentication: authenticationToken } })
        .then(({ data }) => {

          dispatch({
            type: EDIT_NOTE_FINISHED,
            note: { id: noteId, title, content }
          });

          dispatch(push('/user/dashboard'));
        })
        .catch((error) => {
          dispatch({
            type: EDIT_NOTE_FAILED
          });
        });
  }
};
