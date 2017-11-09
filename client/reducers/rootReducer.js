import { combineReducers } from 'redux';
import globalError  from './globalError';
import groups from './groups';


export default combineReducers({
    globalError,
    groups
});