const express = require('express')
const router = express.Router()
const User = require('../models/User')

/* GET home page */
router.get('/', (req, res, next) => {
	const userId = req.user.id
	User.findById(userId)
		.then(theWholeUser => res.render('account/account', { user: theWholeUser }))
		.catch(err => console.log('There was an error: ', err))
})

router.get('/my-goals', (req, res, next) => {
	res.render('account/my-goals')
})

router.post('/my-goals', (req, res, next) => {
	res.render('account/my-goals')
})

module.exports = router
