const axios = require('axios');

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
axios.defaults.headers.common['Api-Key'] = process.env.VUE_APP_BACKEND_API_KEY;

export default axios;
