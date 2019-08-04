const express = require('express')
const router = express.Router()
//const nutrientsAPI = new APIHandler('https://api.nal.usda.gov/ndb')

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
