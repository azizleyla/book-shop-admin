import baseApi from "./baseApi"

const BooksApi = {
    async getAll() {
        const response = await baseApi.get('/book');
        return response.data;
    },
    async addBook(data) {
        const response = await baseApi.post('/book/create', data);
        return response.data;
    },
    async addImage(formDataList) {
        const responses = await Promise.all(formDataList.map((formData) => {
            return baseApi.post(`/book/${formData.get("id")}/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        }));

        // const response = await baseApi.post(`/branch/${formData.get("id")}/image`, formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // });
        return responses.map((response) => response.data);
    },
    async deleteBook(id) {
        const response = await baseApi.delete(`/book/${id}`)
        return response.data;
    }
}
export default BooksApi