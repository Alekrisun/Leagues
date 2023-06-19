import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:59295/api",
    headers: {
        "Content-type": "application/json"
    }
});
