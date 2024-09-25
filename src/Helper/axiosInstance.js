import axios from "axios";

const BackendURL = 'https://youtube-clone-sp.onrender.com/api/v1'

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BackendURL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;