import {
	axiosInstance
} from './api'


class ProgressService {
	static async getProgresses() {
		const res = await axiosInstance.get('/progresses')
		const data = await res.data
		return data
	}

	static async getProgressById(id) {
		const res = await axiosInstance.get(`/progresses/${id}`)
		const data = await res.data
		return data
	}

	static async createProgress(body) {
		console.log(body)
		return axiosInstance.post(`/progresses`, body)
	}

	static async getProgressesBySporter(id) {
		const res = await axiosInstance.get(`/progresses/sporter/${id}`)
		const data = await res.data
		return data
	}

	// static async updateProgress(id, body) {
	//     return axiosInstance.put(`progresses/${id}`, body)
	// } 

	static async deleteProgress(id) {
		return axiosInstance.delete(`/progresses/${id}`)
	}
}

export default ProgressService
