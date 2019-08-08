const axios = require('axios')
const Meal = require('./models/Meal')

class APIHandler {
	constructor(baseUrl) {
		this.foods = axios.create({ baseURL: baseUrl })
	}

	getFullList(food) {
		return this.foods
			.get(`/search/?format=json&q=${food}&sort=n&max=25&offset=0&api_key=${process.env.APP_KEY}`)
			.then(allFoods => {
				return allFoods.data.list.item
			})
			.catch(err => console.log(err))
	}

	getFoodDetails(id, qty) {
		const quantity = qty
		return this.foods
			.get(`https://api.nal.usda.gov/ndb/V2/reports?ndbno=${id}&type=f&format=json&api_key=${process.env.APP_KEY}`)
			.then(foodDetails => {
				let foodName = foodDetails.data.foods[0].food.desc.name
				// foodName = foodName.slice(0, foodName.length - 19)
				const foodNutrients = foodDetails.data.foods[0].food.nutrients.filter(
					elm => elm.nutrient_id == 203 || elm.nutrient_id == 204 || elm.nutrient_id == 205 || elm.nutrient_id == 208
				)
				foodNutrients[0].value = Math.floor((quantity * foodNutrients[0].value) / 100)
				foodNutrients[1].value = Math.floor((quantity * foodNutrients[1].value) / 100)
				foodNutrients[2].value = Math.floor((quantity * foodNutrients[2].value) / 100)
				foodNutrients[3].value = Math.floor((quantity * foodNutrients[3].value) / 100)

				return { foodName, foodNutrients, quantity }
			})
			.catch(err => console.log(err))
	}

	getMeals(id, today) {
		const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
		return Meal.find({ $and: [{ created_at: { $gte: today, $lt: tomorrow } }, { user: `${id}` }] })
			.then(allMeals => {
				const auxBreakfast = allMeals.filter(elm => elm.mealType == 'Breakfast')
				const auxSnacks = allMeals.filter(elm => elm.mealType == 'Snacks')
				const auxLunch = allMeals.filter(elm => elm.mealType == 'Lunch')
				const auxDinner = allMeals.filter(elm => elm.mealType == 'Dinner')
				let breakfast = []
				let snacks = []
				let lunch = []
				let dinner = []

				const primerArr = auxBreakfast.map(elm => {
					return this.getFoodDetails(elm.foods[0].id, elm.foods[0].qty)
						.then(details => {
							breakfast.push(details)
							return details
						})
						.catch(err => console.log(err))
				})

				const secondArr = auxSnacks.map(elm => {
					return this.getFoodDetails(elm.foods[0].id, elm.foods[0].qty)
						.then(details => {
							snacks.push(details)
							return details
						})
						.catch(err => console.log(err))
				})
				const thirdArr = auxLunch.map(elm => {
					return this.getFoodDetails(elm.foods[0].id, elm.foods[0].qty)
						.then(details => {
							lunch.push(details)
							return details
						})
						.catch(err => console.log(err))
				})
				const fourthArr = auxDinner.map(elm => {
					return this.getFoodDetails(elm.foods[0].id, elm.foods[0].qty)
						.then(details => {
							dinner.push(details)
							return details
						})
						.catch(err => console.log(err))
				})
				const promises = [...primerArr, ...secondArr, ...thirdArr, ...fourthArr]

				return Promise.all(promises)
					.then(res => {
						return { breakfast, snacks, lunch, dinner }
					})
					.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
	}
}

const API = new APIHandler('https://api.nal.usda.gov/ndb')
module.exports = API
