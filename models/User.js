const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		username: String,
		password: String,
		gender: { type: String, enum: ['male', 'female'] },
		email: String,
		age: Number,
		calories: {
			type: Number,
			default: 0
		},
		proteins: {
			type: Number,
			default: 0
		},
		carbohydrates: {
			type: Number,
			default: 0
		},
		fats: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
)

const User = mongoose.model('User', userSchema)
module.exports = User
