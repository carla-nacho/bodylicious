const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

/* GET home page */
router.get('/', ensureLoggedIn(), (req, res, next) => {
	const userId = req.user.id
	User.findById(userId)
		.then(theWholeUser => res.render('account/account', { user: theWholeUser }))
		.catch(err => console.log('There was an error: ', err))
})

router.get('/my-goals', ensureLoggedIn(), (req, res, next) => {
	const userId = req.user.id
	User.findById(userId)
		.then(theWholeUser => res.render('account/my-goals', { user: theWholeUser }))
		.catch(err => console.log('There was an error: ', err))
})

router.post('/my-goals', ensureLoggedIn(), (req, res, next) => {
	res.render('account/my-goals')
})

module.exports = router
