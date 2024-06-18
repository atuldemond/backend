const multer = require("multer");
const path = require("path");

function fileFilter(req, file, cb) {
  console.log(file);

  const values = [".png", ".jpeg", ".jpg", ".webp"];
  console.log(values);

  let ext = path.extname(file.originalname);

  let included = values.includes(ext);

  if (included) {
    cb(null, true);
  } else {
    cb(new Error("These files are nor allowed", false));
  }
}
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = upload;
