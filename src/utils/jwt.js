import * as jwt from 'jwt-decode';
//api
//api


const TOKEN_STRING = 'mtTokenTrainer'
let isJWTValid = () => {

	let isValid = false
	const token = localStorage.getItem(TOKEN_STRING)

	if (token !== 'undefined' && token !== null) {
		let decodedToken = jwt(token, {
			complete: true
		})
		let dateNow = new Date()

		//console.log(decodedToken)
		// divided by 1000 cuz getTime() is in milisecond and .exp is in seconds
		if (decodedToken.exp > dateNow.getTime() / 1000) {
			isValid = true

		} else {
			isValid = false
		}
	}
	console.log(isValid)
	return isValid
}

let getTrainerIdFromJWT =  () => {

	const token = localStorage.getItem(TOKEN_STRING)

	let userId = 0
	if (token !== 'undefined' && token !== null) {
		let decodedToken = jwt(token, {
			complete: true
		})
		userId = decodedToken.userId
	}

	

	return userId
}

export {
	isJWTValid,
	getTrainerIdFromJWT
}
