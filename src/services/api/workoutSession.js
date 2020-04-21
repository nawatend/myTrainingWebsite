import {
	axiosInstance
} from './api'

class WorkoutSessionService {
	static async getWorkoutSessions() {
		const res = await axiosInstance.get('/workoutsessions')
		const data = await res.data
		return data
	}

	static async getWorkoutSessionById(id) {
		const res = await axiosInstance.get(`/workoutsessions/${id}`)
		const data = await res.data
		return data
	}


	static async getWorkoutSessionsByTrainer(id) {
		const res = await axiosInstance.get(`/workoutsessions/trainer/${id}`)
		const data = await res.data
		return data
	}

	static async getWorkoutSessionsByWorkoutProgram(id) {
		const res = await axiosInstance.get(`/workoutsessions/workoutprogram/${id}`)
		const data = await res.data
		return data
	}


	static async getWorkoutSessionsByAvailable() {
		const res = await axiosInstance.get(`/workoutsessions/available`)
		const data = await res.data
		return data
	}



	static async createWorkoutSession(body) {
		console.log(body)
		return axiosInstance.post(`/workoutsessions`, body)
	}
	static async updateWorkoutSession(body) {
		console.log(body)
		return axiosInstance.put(`/workoutsessions/update`, body)
	}

	// static async updateWorkoutSession(id, body) {
	//     return axiosInstance.put(`workoutsessions/${id}`, body)
	// } 

	static async deleteWorkoutSession(id) {
		return axiosInstance.delete(`/workoutsessions/${id}`)
	}
}

export default WorkoutSessionService
