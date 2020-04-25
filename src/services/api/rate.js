import {
  axiosInstance
} from './api'

class Rate {
  static async getRates() {
    const res = await axiosInstance.get('/rates')
    const data = await res.data
    return data
  }

  static async getRateById(id) {
    const res = await axiosInstance.get(`/rates/${id}`)
    const data = await res.data
    return data
  }

  static async getRatesByTrainer(id) {
    const res = await axiosInstance.get(`/rates/trainer/${id}`)
    const data = await res.data
    return data
  }

  static async createRate(body) {
    console.log(body)
    return axiosInstance.post(`/rates`, body)
  }

  // static async updateRate(id, body) {
  //     return axiosInstance.put(`rates/${id}`, body)
  // } 

  static async deleteRate(id) {
    return axiosInstance.delete(`/rates/${id}`)
  }
}

export default Rate