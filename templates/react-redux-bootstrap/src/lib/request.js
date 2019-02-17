import axios from 'axios';
import config from '../config/default.json';

axios.defaults.baseURL = config.BACKEND_URL;
axios.defaults.headers.common['Api-Key'] = config.BACKEND_API_KEY;

export default axios;
