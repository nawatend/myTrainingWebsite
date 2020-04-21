import {
	axiosInstance
} from './api'

class SporterService {
	static async getSporters() {
		const res = await axiosInstance.get('/sporters')
		const data = await res.data
		return data
	}

	static async getSportersByTrainer(body) {
		const res = await axiosInstance.post('/sporters/trainer', body)
		const data = await res.data
		return data
	}

	static async getSporterById(id) {
		const res = await axiosInstance.get(`/sporters/${id}`)
		const data = await res.data
		return data
	}

	static async getSporterByUserId(id) {
		const res = await axiosInstance.get(`/sporters/user/${id}`)
		const data = await res.data
		return data
	}

	

	static async sporterByWorkoutProgramId(body){

		return axiosInstance.post(`/sporters/workoutprogram`, body)
	}

	static async inviteByTrainer(body) {

		return axiosInstance.post(`/sporters/invite`, body)
	}

	static async createSporter(body) {

		return axiosInstance.post(`/sporters`, body)
	}

	static async updateSporter(body) {

		return axiosInstance.post(`/users/update`, body)
	}

	static async assignWorkoutProgram(body) {

		return axiosInstance.post(`/sporters/assign/workoutprogram`, body)
	}

	static async updateSporterOnly(body) {

		return axiosInstance.post(`/sporters/update`, body)
	}

	// static async updateSporter(id, body) {
	//     return axiosInstance.put(`sporters/${id}`, body)
	// } 

	static async deleteSporter(id) {
		return axiosInstance.delete(`/sporters/${id}`)
	}
}

export default SporterService
