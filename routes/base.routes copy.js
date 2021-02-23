const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const uploader = require("../configs/cloudinary.config");

const Entry = require("../models/entry.model");
const Code = require("../models/code.model");
// Endpoints

router.post("/newEntry", (req, res, next) => {
	const { code } = req.body.code;
	console.log("entra en ruta");
	Code.find({ code: code })
		.then((response) => {
			console.log("encuentra código", response);
			if (response.data.used) {
				console.log("dice que está usado");
				res.status(500).json({ error: "Código ya utilizado" });
			} else {
				console.log("llega al promise all");
				Promise.all([addEntry(), markCodeAsUsed(response.data)])
					.then((response) => res.json(response))
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => res.status(500).json({ error: "Código Inexistente" }));

	function addEntry() {
		Entry.create(req.body)
			.then((response) => res.json(response))
			.catch((err) =>
				res.status(500).json({
					error: "Error de ENTRY. Por favor prueba de nuevo más tarde",
				})
			);
	}

	function markCodeAsUsed(code) {
		Code.findByIdAndUpdate({ _id: code._id }, { used: true })
			.then((response) => res.json(response))
			.catch((err) =>
				res
					.status(500)
					.json({ error: "Error de CODE. Por favor prueba de nuevo más tarde" })
			);
	}
});

router.get("/codes/:code", (req, res, next) => {
	const code = req.params.code;
});

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
	if (!req.file) {
		next(new Error("No file uploaded"));
		return;
	}

	res.json(req.file);
});

module.exports = router;
