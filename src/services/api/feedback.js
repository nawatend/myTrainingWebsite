import {
  axiosInstance
} from './api'

class Feedback {
  static async getFeedbacks() {
    const res = await axiosInstance.get('/feedbacks')
    const data = await res.data
    return data
  }

  static async getFeedbackById(id) {
    const res = await axiosInstance.get(`/feedbacks/${id}`)
    const data = await res.data
    return data
  }

  static async getFeedbacksByTrainer(id) {
    const res = await axiosInstance.get(`/feedbacks/trainer/${id}`)
    const data = await res.data
    return data
  }


  static async createFeedback(body) {
    return axiosInstance.post(`/feedbacks`, body)
  }

  static async confirmFeedback(body) {
    return axiosInstance.post(`/feedbacks/confirm`, body)
  }

  // static async updateFeedback(id, body) {
  //     return axiosInstance.put(`feedbacks/${id}`, body)
  // } 

  static async deleteFeedback(id) {
    return axiosInstance.delete(`/feedbacks/${id}`)
  }
}

export default Feedback