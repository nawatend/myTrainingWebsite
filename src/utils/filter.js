const filterArrayObjectByTwoKeys = (objectsArray, searchTerm, key, key2 = '') => {

	let child = key.substr(0, key.indexOf("."))
	let child2 = key2.substr(0, key2.indexOf("."))
	let finalKey = key.substr(key.indexOf(".") + 1, key.length)
	let finalKey2 = key2.substr(key2.indexOf(".") + 1, key2.length)
	// console.log('child1', child)
	// console.log('child2', child2)
	// console.log('key', finalKey)
	// console.log('key2', finalKey2)

	
	let filteredArray = objectsArray.filter((object) => {

		if (child === '' && child2 === '') {
			if (finalKey2 !== '') {

				if (object[finalKey2] !== undefined && object[finalKey] !== undefined) {

					return (object[finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1 || object[finalKey2].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			} else {

				if (object[finalKey] !== undefined) {
					return (object[finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			}


		}

		if (child !== '' && child2 !== '') {

			if (finalKey2 !== '') {
				if (object[child2][finalKey2] !== undefined && object[child][finalKey] !== undefined) {
					return (object[child][finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1 || object[child2][finalKey2].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			} else {
				if (object[finalKey] !== undefined) {
					return (object[child][finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			}
		} else if (child !== '' && child2 === '') {

			if (finalKey2 !== '') {
				if (object[finalKey2] !== undefined && object[child][finalKey] !== undefined) {

					return (object[child][finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1 || object[finalKey2].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			} else {
				if (object[child][finalKey] !== undefined) {
					console.log(object[child][finalKey])
					return (object[child][finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			}


		} else if (child === '' && child2 !== '') {

			if (finalKey2 !== '') {
				if (object[child2][finalKey2] !== undefined && object[finalKey] !== undefined) {
					return (object[finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1 || object[child2][finalKey2].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			} else {
				if (object[finalKey] !== undefined) {
					return (object[finalKey].toString().toLowerCase().search(searchTerm.toLowerCase()) !== -1) ? true : false
				}
			}

		}






	})










	console.log("filtered:", filteredArray)
	return filteredArray
}


export {
	filterArrayObjectByTwoKeys
}
