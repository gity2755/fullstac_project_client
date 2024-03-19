import axios from "axios";
import { UseSelector } from "react-redux";
let baseUrl = "http://localhost:5000/api/order";
export const getAllOrders = (token) => {
    return axios.get(`${baseUrl}`, { headers: { "xxx-token": token } })
}
export const getOrderById = (id, token) => {
    return axios.get(`${baseUrl}/myOrders`, { headers: { "xxx-token": token } });
}


//????למה חוזר שגיאת 401
export const addOrder = (order, token) => {
    console.log("token in order api : " + token);
    console.log("order in api : " + order);
    return axios.post(`${baseUrl}`, order, { headers: { "xxx-token": token } });
};



export const updateOrder = (id, token) => {
    return axios.put(`${baseUrl}/${id}`, { headers: { "xxx-token": token } })
}
export const deleteOrderById = (id, token) => {
    return axios.delete(`${baseUrl}/${id}`, { headers: { "xxx-token": token } })
}

