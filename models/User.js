const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		username: String,
		password: String,
		gender: { type: String, enum: ['male', 'female'] },
		email: String,
		age: Number
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
