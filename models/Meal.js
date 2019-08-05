const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema(
	{
		mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'] },
		foods: {
			type: [],
			default: []
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
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
