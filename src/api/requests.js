import axios from 'axios'

const requests = axios.create({
    baseURL: 'https://api-project9.lotusflare.com/api/v3',
    timeout: 10000,
    // withCredentials: true
})

requests.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token')
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    }
)

requests.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        // if (error.response.status === 401) {
        //     localStorage.removeItem('token')
        //     window.location.reload()
        // }
        return Promise.reject(error)
    }
)

export default requests
