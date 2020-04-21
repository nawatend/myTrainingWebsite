import {
  axiosInstance
} from './api'

class User {
  static async getUsers() {
    const res = await axiosInstance.get('/users')
    const data = await res.data
    return data
  }

  static async getUserById(id) {
    const res = await axiosInstance.get(`/users/${id}`)
    const data = await res.data
    return data
  }

  static async createUser(body) {
    console.log(body)
    return axiosInstance.post(`/users`, body)
  }

  // static async updateUser(id, body) {
  //     return axiosInstance.put(`users/${id}`, body)
  // } 

  static async deleteUser(id) {
    return axiosInstance.delete(`/users/${id}`)
  }
}

export default User