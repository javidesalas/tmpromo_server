const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema(
	{
		firstName: String,
		lastName: String,
		birthDate: Date,
		zipCode: Number,
		email: String,
		phone: String,
		code: String,
		boughtAt: {
			type: String,
			enum: [
				"Ahorramas",
				"Alcampo",
				"BonPreu",
				"Carrefour",
				"ECI",
				"Eroski",
				"Otros",
			],
		},
		imageUrl: String,
		acceptedTerms: Boolean,
	},
	{
		timestamps: true,
	}
);

const Entry = mongoose.model('Entry', entrySchema)
module.exports = Entry