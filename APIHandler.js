const axios = require('axios')

class APIHandler {
	constructor(baseUrl) {
		this.foods = axios.create({ baseURL: baseUrl })
	}

	getFullList(food) {
		return this.foods
			.get(`/search/?format=json&q=${food}&sort=n&max=25&offset=0&api_key=vpW3Py8RoId1FaD0yNOifYD60xGkQtXzDWNF1Xr1`)
			.then(allFoods => {
				return allFoods.data.list.item
			})
			.catch(err => console.log(err))
	}
}

const API = new APIHandler('https://api.nal.usda.gov/ndb')
module.exports = API
