const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const API = require('../APIHandler')

/* GET home page */
router.get('/', ensureLoggedIn(), (req, res, next) => {
	let today = new Date()
	today.setHours(0, 0, 0)
	API.getMeals(req.user.id, today)
		.then(meals => {
			let total = [0, 0, 0, 0]
			for (let i = 0; i < meals.breakfast.length; i++) {
				total[0] += meals.breakfast[i].foodNutrients[0].value
				total[1] += meals.breakfast[i].foodNutrients[1].value
				total[2] += meals.breakfast[i].foodNutrients[2].value
				total[3] += meals.breakfast[i].foodNutrients[3].value
			}
			for (let i = 0; i < meals.lunch.length; i++) {
				total[0] += meals.lunch[i].foodNutrients[0].value
				total[1] += meals.lunch[i].foodNutrients[1].value
				total[2] += meals.lunch[i].foodNutrients[2].value
				total[3] += meals.lunch[i].foodNutrients[3].value
			}
			for (let i = 0; i < meals.dinner.length; i++) {
				total[0] += meals.dinner[i].foodNutrients[0].value
				total[1] += meals.dinner[i].foodNutrients[1].value
				total[2] += meals.dinner[i].foodNutrients[2].value
				total[3] += meals.dinner[i].foodNutrients[3].value
			}
			for (let i = 0; i < meals.snacks.length; i++) {
				total[0] += meals.snacks[i].foodNutrients[0].value
				total[1] += meals.snacks[i].foodNutrients[1].value
				total[2] += meals.snacks[i].foodNutrients[2].value
				total[3] += meals.snacks[i].foodNutrients[3].value
			}
			const objectiveCalories = req.user.calories.toFixed()
			const consumedCalories = total[0].toFixed()
			const leftCalories = objectiveCalories - consumedCalories
			const percentageCalories = (consumedCalories * 100) / objectiveCalories

			const objectiveProtein = ((objectiveCalories * req.user.proteins) / 400).toFixed()
			const consumedProteins = total[1].toFixed()
			const leftProteins = objectiveProtein - consumedProteins
			const percentageProtein = (consumedProteins * 100) / objectiveProtein

			const objectiveFats = ((objectiveCalories * req.user.fats) / 900).toFixed()
			const consumedFats = total[2].toFixed()
			const leftFats = objectiveFats - consumedFats
			const percentageFats = (consumedFats * 100) / objectiveFats

			const objectiveCarbs = ((objectiveCalories * req.user.carbohydrates) / 400).toFixed()
			const consumedCarbs = total[3].toFixed()
			const leftCarbs = objectiveCarbs - consumedCarbs
			const percentageCarbs = (consumedCarbs * 100) / objectiveCarbs

			const data = {
				objectiveCalories,
				consumedCalories,
				leftCalories,
				percentageCalories,
				objectiveProtein,
				consumedProteins,
				leftProteins,
				percentageProtein,
				objectiveFats,
				consumedFats,
				leftFats,
				percentageFats,
				objectiveCarbs,
				consumedCarbs,
				leftCarbs,
				percentageCarbs
			}

			console.log(data)
			res.render('account/account', { user: req.user, data })
		})
		.catch(err => console.log(err))
})

router.get('/my-goals', ensureLoggedIn(), (req, res, next) => {
	const userId = req.user.id
	User.findById(userId)
		.then(theWholeUser => res.render('account/my-goals', { user: theWholeUser }))
		.catch(err => console.log('There was an error: ', err))
})

router.post('/my-goals', ensureLoggedIn(), (req, res, next) => {
	const userId = req.user.id
	const { calories, carbohydrates, proteins, fats } = req.body
	console.log(parseInt(proteins) + parseInt(carbohydrates) + parseInt(fats))
	if (parseInt(proteins) + parseInt(carbohydrates) + parseInt(fats) != 100) {
		User.findById(userId)
			.then(theWholeUser => res.render('account/my-goals', { user: theWholeUser, message: 'Your macros must sum 100%' }))
			.catch(err => console.log('There was an error: ', err))
	} else {
		User.findByIdAndUpdate(userId, { $set: { calories, carbohydrates, proteins, fats } })
			.then(() => res.redirect('/account/my-goals'))
			.catch(err => console.log('Ha habido un error: ', err))
	}
})

module.exports = router
