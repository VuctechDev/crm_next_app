import multer from "multer";
import multerS3 from "multer-s3";
import { getS3Client } from "./s3";

// export const multerUpload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/uploads", // Destination folder for uploads
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
//     },
//   }),
// });

export const multerUpload = multer({
  storage: multerS3({
    s3: getS3Client(),
    bucket: process.env.S3_BUCKET ?? "",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});
