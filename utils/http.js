import Axios from "axios";

const http = Axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        Accept: "application/json"
    }
});

export default http;