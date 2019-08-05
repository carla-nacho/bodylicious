const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema(
	{
		type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'] },
		food: {
			type: Array,
			default: []
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

const Meal = mongoose.model('Meal', mealSchema)
module.exports = Meal
