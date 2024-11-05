const fs = require("fs");

const createDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const handleFileUpload = (file, newPath, res) => {
  // fs.rename is used because `formidable` stores file in temp location while processing it.
  // So when all validations are passed we just move and rename it to the desired location
  fs.rename(file.filepath, newPath, (err) => {
    if (err) {
      handleError(res, 500, "Error uploading image.");
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ filename: newPath.replace("uploads/", "") }));
  });
};

const resolveCORS = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // Just to allow only the minimum what is necessary.
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const handleError = (res, statusCode, message) => {
  console.error(message);
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: message }));
};

module.exports = { createDir, handleFileUpload, resolveCORS, handleError };
