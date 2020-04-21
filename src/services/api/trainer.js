import {
  axiosInstance
} from './api'

class TrainerService {
  static async getTrainers() {
    const res = await axiosInstance.get('/trainers')
    const data = await res.data
    return data
  }

  static async getTrainerById(id) {
    const res = await axiosInstance.get(`/trainers/${id}`)
    const data = await res.data
    return data
  }

  static async getTrainerByUserId(id) {
    const res = await axiosInstance.get(`/trainers/user/${id}`)
    const data = await res.data
    return data
  }

  static async createTrainer(body) {
    console.log(body)
    return axiosInstance.post(`/trainers`, body)
  }

  static async updateTrainer(body) {
    console.log(body)
    return axiosInstance.post(`/users/update`, body)
  }

  // static async updateTrainer(id, body) {
  //     return axiosInstance.put(`trainers/${id}`, body)
  // } 

  static async deleteTrainer(id) {
    return axiosInstance.delete(`/trainers/${id}`)
  }
}

export default TrainerService