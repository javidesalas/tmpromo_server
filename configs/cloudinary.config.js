const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const { default: ShortUniqueId } = require("short-unique-id");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "tickets",
		format: async (req, file) => "jpg",
		public_id: (req, file) => {
			const uid = new ShortUniqueId({ length: 6 });
			const filename = `ticket-${uid.dict.join("").substring(0, 6)}`;
			return filename;
		},
		transformation: { height: 800, width: 800, crop: "fit" },
	},
});

const uploader = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
			return cb(null, false);
		} else {
			cb(null, true);
		}
	},
});
module.exports = uploader;
