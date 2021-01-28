const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
;

const uploader = require("../configs/cloudinary.config");

const Entry = require("../models/entry.model");

//import {multerUploads} from ('../configs/multer.config')

// Endpoints

router.post("/newEntry", (req, res, next) => {
	Entry.create(req.body)
		.then((response) => res.json(response))
		.catch((err) => res.status(500).json(err));
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
