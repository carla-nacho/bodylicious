const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User')
const uploadCloud = require('../configs/cloudinary.config')

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt')
const bcryptSalt = 10

router.get('/login', (req, res, next) => {
	res.render('auth/login', { message: req.flash('error') })
})

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/account',
		failureRedirect: '/login',
		failureFlash: true,
		passReqToCallback: true
	})
)

router.get('/signup', (req, res, next) => {
	res.render('auth/signup')
})

router.post('/signup', uploadCloud.single('photo'), (req, res, next) => {
	const username = req.body.username
	const password = req.body.password
	const email = req.body.email
	const age = req.body.age
	const gender = req.body.gender
	const calories = req.body.calories
	const proteins = req.body.proteins
	const fats = req.body.fats
	const carbohydrates = req.body.carbohydrates
	if (username === '' || password === '' || email === '' || gender === '' || req.file === undefined) {
		res.render('auth/signup', { message: 'Please fill out all fields' })
		return
	}
	const imgPath = req.file.url

	if (parseInt(proteins) + parseInt(carbohydrates) + parseInt(fats) != 100) {
		res.render('auth/signup', { message: 'Your macros must sum 100' })
		return
	}

	User.findOne({ username }, 'username', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'The username already exists' })
			return
		}

		const salt = bcrypt.genSaltSync(bcryptSalt)
		const hashPass = bcrypt.hashSync(password, salt)

		const newUser = new User({
			username,
			password: hashPass,
			email,
			age,
			gender,
			calories,
			proteins,
			fats,
			carbohydrates,
			imgPath
		})

		newUser
			.save()
			.then(() => {
				res.redirect('/login')
			})
			.catch(err => {
				res.render('auth/signup', { message: 'Something went wrong' })
			})
	})
})

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/login')
})

module.exports = router
