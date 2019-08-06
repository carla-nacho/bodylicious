const express = require('express')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const Meal = require('../models/Meal')
const API = require('../APIHandler')

/* GET home page */
router.get('/', ensureLoggedIn(), (req, res, next) => {
	API.getMeals(req.user.id)
		.then(meals => {
			res.render('diary/diary-index', { meals })
		})
		.catch(err => console.log(err))
})
router.post('/', ensureLoggedIn(), (req, res, next) => {
	const date = new Date(req.body.date)
	API.getMeals(req.user.id, date)
		.then(meals => {
			res.render('diary/diary-index', { meals })
		})
		.catch(err => console.log(err))
})

router.get('/add', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/add-food')
})

router.post('/add', ensureLoggedIn(), (req, res, next) => {
	API.getFullList(req.body.foodSearch)
		.then(data => res.render('diary/add-food', { foods: data }))
		.catch(err => console.log(err))
})

router.post('/add/meal', ensureLoggedIn(), (req, res, next) => {
	const foodId = req.body.foodId
	const quantity = req.body.quantity
	const mealType = req.body.meals
	const user = req.user.id
	const foods = [
		{
			id: foodId,
			qty: quantity
		}
	]

	const newMeal = new Meal({
		mealType,
		foods,
		user
	})

	newMeal
		.save()
		.then(() => {
			res.redirect('/diary')
		})
		.catch(err => {
			console.log('Error: ', err)
		})
})

module.exports = router
