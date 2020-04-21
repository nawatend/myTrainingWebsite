import {
  axiosInstance
} from './api'

class ExerciseBase {
  static async getExerciseBases() {
    const res = await axiosInstance.get('/exercisebases')
    const data = await res.data
    return data
  }

  static async getExerciseBaseById(id) {
    const res = await axiosInstance.get(`/exercisebases/${id}`)
    const data = await res.data
    return data
  }

  static async getExerciseBasesByTrainer(id) {
    const res = await axiosInstance.get(`/exercisebases/trainer/${id}`)
    const data = await res.data
    return data
  }

  static async createExerciseBase(body) {
    console.log(body)
    return axiosInstance.post(`/exercisebases`, body)
  }

  // static async updateExerciseBase(id, body) {
  //     return axiosInstance.put(`exercisebases/${id}`, body)
  // } 

  static async deleteExerciseBase(id) {
    return axiosInstance.delete(`/exercisebases/${id}`)
  }
}

export default ExerciseBase