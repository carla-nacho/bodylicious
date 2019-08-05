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

	getFoodDetails(id) {
		return this.foods
			.get(
				`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${id}&type=f&format=json&api_key=vpW3Py8RoId1FaD0yNOifYD60xGkQtXzDWNF1Xr1`
			)
			.then(foodDetails => {
				const foodName = foodDetails.data.foods[0].food.desc.name
				const foodNutrients = foodDetails.data.foods[0].food.nutrients.filter(
					elm => elm.nutrient_id == 203 || elm.nutrient_id == 204 || elm.nutrient_id == 205 || elm.nutrient_id == 208
				)
				return { foodName, foodNutrients }
			})
			.catch(err => console.log(err))
	}
}

const API = new APIHandler('https://api.nal.usda.gov/ndb')
module.exports = API
