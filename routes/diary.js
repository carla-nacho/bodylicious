const express = require('express')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const Meal = require('../models/Meal')
const API = require('../APIHandler')

/* GET home page */
router.get('/', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/diary-index')
})

router.get('/add', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/add-food')
})

router.post('/add', ensureLoggedIn(), (req, res, next) => {
	const foods = API.getFullList(req.body.foodSearch)
	API.getFullList(req.body.foodSearch)
		.then(data => res.render('diary/add-food', { foods: data }))
		.catch(err => console.log(err))
})

module.exports = router
