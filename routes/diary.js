const express = require('express')
const router = express.Router()

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('diary/diary-index')
})

router.get('/add', (req, res, next) => {
	res.render('diary/add-food')
})

router.post('/add', (req, res, next) => {
	res.render('diary/add-food')
})
module.exports = router
