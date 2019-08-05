const express = require('express')
const router = express.Router()
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')

/* GET home page */
router.get('/', ensureLoggedOut(), (req, res, next) => {
	res.render('index')
})

module.exports = router
