import express from 'express';
import axios from 'axios';

import api from '../api';

const route = express.Router();

route.get('/', (req, res) => {
    axios.get(api.groups)
        .then(resp => res.json( resp.data.groups ))
        .catch(err => res.status(400).json({ errors: 'Can\'t get groups' }))
});



export default route;