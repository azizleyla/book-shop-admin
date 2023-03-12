import axios from "axios";

const baseApi = axios.create({
    baseURL: "http://bookstoreaze-001-site1.etempurl.com/api/v1"
})
export default baseApi