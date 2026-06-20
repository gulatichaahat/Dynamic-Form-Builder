import axios from "axios";

const API = axios.create({

    baseURL: "https://dynamic-form-builder-1-rqfu.onrender.com/api"

});

export default API;