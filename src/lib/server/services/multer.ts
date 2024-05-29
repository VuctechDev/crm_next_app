import multer from "multer";

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // Destination folder for uploads
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
  }),
});
