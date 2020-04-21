import jwtDecode from 'jwt-decode'

import {
	axiosInstance
} from './api'

const TOKEN_STRING = 'mtTokenTrainer'

class Auth {

	static async login(body) {
		const {
			data
		} = await axiosInstance.post(`/auth/login`, body)
		this.setToken(data)
	}

	static logout() {
		localStorage.removeItem(TOKEN_STRING)
	}

	static getDecodedToken(token) {
		if (token && token !== null && token !== undefined) {
			const decodedToken = jwtDecode(token)
			return decodedToken
		}
	}

	static isAuthenticated() {
		return this.getToken() !== undefined && this.getToken() !== null
	}

	static expiresAt() {
		return new Date(this.getDecodedToken(this.getToken()).exp * 1000)
	}

	static isExpired() {
		return new Date() > this.expiresAt()
	}

	static getToken() {
		return localStorage.getItem(TOKEN_STRING)
	}

	static setToken(token) {
		localStorage.setItem(TOKEN_STRING, token)
	}
}

export default Auth
