import { combineReducers } from 'redux';
import user from './user';
import globalError  from './globalError';


export default combineReducers({
    user,
    globalError,

});