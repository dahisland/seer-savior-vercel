import multer from "multer";
import { multerErrors } from "../utils/multer.errors.js";

// Multer storage parameters (indicate folder destination storage and rename file by using the unique user pseudo
const storage = multer.memoryStorage();

// Multer filter parameters. File will be stored only if format is correct and pseudo is given in the request
function fileFilter(req, file, cb) {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("Wrong format"));
    cb(null, false);
  }
}

// Implement multer with all parameters (File won't be stored if his size is greater than size limits)
const multerMiddleware = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 500000,
  },
}).single("file");

// Middleware with errors management
// (multer will store file sent by form-data request into the public/images/avatars folder according to the previous parameters)
export const uploadMiddleware = (req, res, next) => {
  multerMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({ status: 400, error: multerErrors(err, req) });
      next(err);
    } else if (err) {
      res
        .status(400)
        .json({ status: 400, error: err.message ? err.message : err });
      next(err);
    } else {
      next();
    }
  });
};
