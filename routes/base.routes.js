const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const uploader = require("../configs/cloudinary.config");

const Entry = require("../models/entry.model");
const Code = require("../models/code.model");
// Endpoints

router.post("/newEntry", (req, res, next) => {
	const {
		firstName,
		lastName,
		birthDate,
		zipCode,
		email,
		phone,
		code,
		boughtAt,
		imageUrl,
		acceptedTerms,
	} = req.body;

	Code.findOne({ code: code })
		.then((response) => {
			const codeId = response._id;
			if (response.used === false) {
				Entry.create({
					firstName,
					lastName,
					birthDate,
					zipCode,
					email,
					phone,
					code,
					boughtAt,
					imageUrl,
					acceptedTerms,
				})
					.then((response) => {
						return Code.findByIdAndUpdate(codeId, { used: true });
					})
					.then((response) => res.json(response))
					.catch((err) =>
						res
							.status(500)
							.json({ error: "Error de servidor.Por favor prueba más tarde" })
					);
			} else {
				res.status(500).json({ error: "Código ya utilizado" });
			}
		})
		.catch((err) => res.status(500).json({ error: "Código inválido" }));
});

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
	if (!req.file) {
		next(new Error("No file uploaded"));
		return;
	}

	res.json(req.file);
});

module.exports = router;
