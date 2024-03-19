import { logDOM } from "@testing-library/react";
import axios from "axios";

let baseUrl = "http://localhost:5000/api/user";

export const loginInServer = (credentials) => {
    try {
        console.log("user in api : name: " + credentials.userName + "  pass : " + credentials.password);
        return axios.post(`${baseUrl}/login`, credentials);
    }
    catch (err) {
        console.error("error in server : " + err);
    }
};
export const registerInServer = (user) => {
    console.log(user.userName+user.email+user.password);
    return axios.post(`${baseUrl}`, user);
};
