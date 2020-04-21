import {
  axiosInstance
} from './api'

class ExerciseFull {
  static async getExerciseFulls() {
    const res = await axiosInstance.get('/exercisefulls')
    const data = await res.data
    return data
  }

  static async getExerciseFullById(id) {
    const res = await axiosInstance.get(`/exercisefulls/${id}`)
    const data = await res.data
    return data
  }

  static async getExerciseFullsByWorkoutSession(id) {
    const res = await axiosInstance.get(`/exercisefulls/workoutsession/${id}`)
    const data = await res.data
    return data
  }

  static async createExerciseFull(body) {
    console.log(body)
    return axiosInstance.post(`/exercisefulls`, body)
  }

  // static async updateExerciseFull(id, body) {
  //     return axiosInstance.put(`exercisefulls/${id}`, body)
  // } 

  static async deleteExerciseFull(id) {
    return axiosInstance.delete(`/exercisefulls/${id}`)
  }
}

export default ExerciseFull