import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import auth from './auth';
import notes from './notes';

export default (history) => combineReducers({
    router: connectRouter(history),
    auth,
    notes
});
