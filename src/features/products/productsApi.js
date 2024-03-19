import axios from "axios";


let baseUrl = "http://localhost:5000/api/item";


export const getProducts = (page, perPage, search) => {
    let a=axios.get(`${baseUrl}?page=${page}&perPage=${perPage}&search=${search}`)
    console.log(a);
    return axios.get(`${baseUrl}?page=${page}&perPage=${perPage}&search=${search}`)
}
export const getItemById = (id) => {
    let axi = axios.get(`${baseUrl}/${id}`);
    console.log(axi);
    return axios.get(`${baseUrl}/${id}`);
}
export const addItem = (item, token) => {
   
    return axios.post(`${baseUrl}`, item, { headers: { "xxx-token": token } });
}
export const deleteById = (id, token) => {
    console.log("token in delete item api ", token);
    return axios.delete(`${baseUrl}/${id}`, { headers: { "xxx-token": token } })
}
export const updateItem = (id, updatedItem, token) => {
    return axios.put(`${baseUrl}/${id}`, updatedItem, { headers: { 'xxx-token': token } });
};


// import axios from "axios"

// //כאן יהיו כל הקריאות לשרת בקשר למוצרים
// let baseUrl = "http://localhost:5000/api/item"

// export const getProducts = (page, perPage, search) => {
//     return axios.get(`${baseUrl}?page=${page}&perPage=${perPage}&search=${search}`)
// }
// // export const getProductById()
// export const addProduct = (product) => {
//     return axios.post(`${baseUrl}`, product)
// }