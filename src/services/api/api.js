import axios from 'axios'


// Default Axios Instance
export const axiosInstance = axios.create({
	//baseURL: 'https://my-training.herokuapp.com/api'
	baseURL: 'http://localhost:4000/api'
})

export const setAuthorizationHeader = (mtToken) => {
	axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${mtToken}`
}
