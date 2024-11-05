const ALLOWED_TYPES = ["image/jpg", "image/jpeg", "image/png"];
const ALLOWED_EXTENSIONS = ALLOWED_TYPES.map((type) =>
  type.replace("image/", ".")
).join(", ");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const PORT = 3001;
const UPLOAD_DIR = "uploads";

module.exports = {
  ALLOWED_TYPES,
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE,
  PORT,
  UPLOAD_DIR,
};
