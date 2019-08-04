const express = require('express')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

/* GET home page */
router.get('/', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/diary-index')
})

router.get('/add', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/add-food')
})

router.post('/add', ensureLoggedIn(), (req, res, next) => {
	res.render('diary/add-food')
})
module.exports = router
