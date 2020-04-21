import {
	axiosInstance
} from './api/api'

class WorkoutProgramService {

	static async getExercises() {
		const res = await axiosInstance.get('exercises')
		const data = await res.data
	}

	static async createExercise(body) {
		return axiosInstance.post('exercise/save', body)
	}
}

export default WorkoutProgramService
