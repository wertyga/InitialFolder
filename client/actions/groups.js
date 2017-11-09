import axios from 'axios';

import { globalError } from './errors';

export const FETCH_GROUPS = 'FETCH_GROUPS';

export function fetchGroups() {
    return dispatch => {
        return axios.get('/api/groups')
            .then(res => dispatch(groupsFetch(res.data)))
            .catch(err => {
                dispatch(globalError(err.response ? err.response.data.errors : err.message));
                throw new Error(err.response ? err.response.data : err.message)
            })
    }
};
function groupsFetch(groups) {
    return {
        type: FETCH_GROUPS,
        groups
    }
};