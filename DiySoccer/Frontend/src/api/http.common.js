import axios from "axios";

export default axios.create({
    baseURL: "https://alkr-soccer-d5fma9g4hseke8d4.swedencentral-01.azurewebsites.net/api",
    headers: {
        "Content-type": "application/json"
    }
});
