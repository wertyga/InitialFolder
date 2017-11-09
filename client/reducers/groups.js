import { FETCH_GROUPS } from '../actions/groups';

export default function error(state = [], action = {}) {
    switch(action.type) {

        case FETCH_GROUPS: {
            return action.groups
        }

        default: return state;
    }
};