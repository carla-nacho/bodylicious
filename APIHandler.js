const axios = require('axios')
const Meal = require('./models/Meal')

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

	getMeals(id) {
		return Meal.find({ user: `${id}` })
			.then(allMeals => {
				const breakfast = allMeals.filter(elm => elm.mealType == 'Breakfast')
				const snacks = allMeals.filter(elm => elm.mealType == 'Snacks')
				const lunch = allMeals.filter(elm => elm.mealType == 'Lunch')
				const dinner = allMeals.filter(elm => elm.mealType == 'Dinner')
				return { breakfast, snacks, lunch, dinner }
			})
			.catch(err => console.log(err))
	}
}

const API = new APIHandler('https://api.nal.usda.gov/ndb')
module.exports = API
