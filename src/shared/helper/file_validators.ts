import { extname } from "path";

export const imageFileFilter = (req, file, callback) => {

	//image file validator for upload profile img
	if (file.fieldname == "profilePic" || file.fieldname == "image") {
		if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
			req.fileValidationError = 'Only Images are allowed';
			req.statusCode = 422;
			return callback(null, false, new Error(req.fileValidationError), file.originialname);
		}
	} else
		//document+img file validator for upload doc
		if (file.fieldname == "document") {
			if (!file.originalname.match(/\.(jpg|jpeg|png|svg|doc|docx|ppt|pptx|csv|txt|ods|pdf|mp4|flv|wmv|mov)$/)) {
				req.fileValidationError = 'Only Documents are allowed';
				req.statusCode = 422;
				return callback(null, false, new Error(req.fileValidationError), file.originialname);
			}
		} else
			if (file.fieldname == "importFile") {
				if (!file.originalname.match(/\.(csv)$/)) {
					req.fileValidationError = 'Only CSV are allowed';
					req.statusCode = 422;
					return callback(null, false, new Error(req.fileValidationError), file.originialname);
				}
			}

	callback(null, true);
};

export const editFileName = (req, file, callback) => {
	let name = file.originalname.split(".")[0];
	name = name.split(" ").join("");
	const fileExtName = extname(file.originalname);
	const fileNameDate = Date.now();
	const randomName = Array(4)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join("");
	callback(null, `${fileNameDate}_${name}${fileExtName}`);

};

export const imageAndVideoFileFilter = (req, file, callback) => {

	//image/video file validator for upload
	if (file.fieldname == "media_file") {
		if (!file.originalname.match(/\.(jpg|jpeg|png|svg|mp4|flv|wmv|mov)$/)) {
			req.fileValidationError = 'Only Images Or Video files are allowed';
			req.statusCode = 422;
			return callback(null, false, new Error(req.fileValidationError), file.originialname);
		}
	}
	callback(null, true);
};
