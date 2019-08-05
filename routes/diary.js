const express = require('express')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
//const nutrientsAPI = new APIHandler('https://api.nal.usda.gov/ndb')
const Meal = require('../models/Meal')

/* GET home page */
router.get('/', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/diary-index')
})

router.get('/add', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/add-food')
})

router.post('/add', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/add-food')
	// const { type, food} = req.body

	// Meal.create({ type,food})
	// .then(() => res.redirect('/'))
	// .catch(err => console.log('Hubo un error:', err))
})

module.exports = router
