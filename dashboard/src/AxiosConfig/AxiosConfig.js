import axios from "axios";
axios.defaults.baseURL =
  process.env.REACT_APP_PRODUCTION > 0
    ? process.env.REACT_APP_PRODUCTION_URL + "/api"
    : process.env.REACT_APP_LOCALHOST_URL + "/api";
//interceptors

export default axios;
