import baseApi from "./baseApi"

const BooksApi = {
    async getAll() {
        const response = await baseApi.get('/book');
        return response.data;
    },
    async addBook(data) {
        const response = await baseApi.post('/book/create', data);
        console.log(response.data)
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

        return responses.map((response) => response.data);
    },
    async updateImage(formDataList) {
        const responses = await Promise.all(formDataList.map((formData) => {
            return baseApi.put(`/book/${formData.get('id')}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

        }))
        return responses.map((response) => response.data);
    },
    async deleteBook(id) {
        const response = await baseApi.delete(`/book/${id}`)
        return response.data;
    },
    async updateBook({ id, data }) {
        const response = await baseApi.put(`/book/${id}`, data);
        console.log('r', response.data)
        return response.data;

    },

}
export default BooksApi