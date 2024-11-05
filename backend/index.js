const http = require("http");
const fs = require("fs");
const path = require("path");
const { formidable } = require("formidable");
const {
  ALLOWED_TYPES,
  ALLOWED_EXTENSIONS,
  MAX_FILE_SIZE,
  PORT,
  UPLOAD_DIR,
} = require("./constants");
const {
  createDir,
  handleFileUpload,
  resolveCORS,
  handleError,
} = require("./utils");

createDir(UPLOAD_DIR);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  resolveCORS(res);

  if (req.method === "POST" && url.pathname === "/upload") {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
      if (err) {
        handleError(res, 500, "Error uploading image.");
        return;
      }

      const file = files.image[0];
      const newPath = `uploads/${Date.now()}-${file.originalFilename}`;

      const isAllowedFileType = ALLOWED_TYPES.includes(
        file.mimetype.toLowerCase()
      );

      if (!isAllowedFileType) {
        handleError(
          res,
          400,
          `Invalid image format: ${file.mimetype}. Please upload one of the allowed types: ${ALLOWED_EXTENSIONS}.`
        );
        return;
      }

      const isAllowedFileSize = file.size < MAX_FILE_SIZE;
      if (!isAllowedFileSize) {
        handleError(
          res,
          400,
          `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
        );
        return;
      }

      handleFileUpload(file, newPath, res);
    });
  } else if (req.method === "GET" && url.pathname.startsWith("/images/")) {
    // Because if the file name has special characters we need to decode url, because browser will encode these characters
    const filename = decodeURIComponent(
      url.pathname.substring("/images/".length)
    );
    const imagePath = `${UPLOAD_DIR}/${filename}`;

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        handleError(res, 404, "Image not found.");
        return;
      }

      const ext = path.extname(imagePath).toLowerCase().slice(1);
      const contentType =
        ALLOWED_TYPES.find((type) => type.endsWith(ext)) || "image/jpeg";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  } else {
    handleError(res, 404, "Not found.");
  }
});

server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
