import {
	axiosInstance
} from './api'

class WorkoutProgramService {
	static async getWorkoutPrograms() {
		const res = await axiosInstance.get('/workoutprograms')
		const data = await res.data
		return data
	}

	static async getWorkoutProgramById(id) {
		const res = await axiosInstance.get(`/workoutprograms/${id}`)
		const data = await res.data
		return data
	}
	
	static async getWorkoutProgramsByTrainer(id) {
		const res = await axiosInstance.get(`/workoutprograms/trainer/${id}`)
		const data = await res.data
		return data
	}

	static async createWorkoutProgram(body) {
		console.log(body)
		return axiosInstance.post(`/workoutprograms`, body)
	}

	static async updateWorkoutProgram(body) {
		console.log(body)
		return axiosInstance.put(`/workoutprograms/update`, body)
	}

	// static async updateWorkoutProgram(id, body) {
	//     return axiosInstance.put(`workoutprograms/${id}`, body)
	// } 

	static async deleteWorkoutProgram(id) {
		return axiosInstance.delete(`/workoutprograms/${id}`)
	}
}

export default WorkoutProgramService
