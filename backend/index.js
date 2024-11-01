const http = require("http");
const fs = require("fs");
const { formidable } = require("formidable");

const PORT = 3001;

const ALLOWED_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
];
const ALLOWED_EXTENSIONS = ALLOWED_TYPES.map((type) =>
  type.replace("image/", ".")
).join(", ");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const resolveCORS = (res) => {
  // Set CORS headers to allow requests from localhost:3000
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  resolveCORS(res);

  if (req.method === "POST" && url.pathname === "/upload") {
    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error uploading image.");
        return;
      }

      const file = files.image[0];
      const newPath = `uploads/${Date.now()}-${file.originalFilename}`;

      if (!ALLOWED_TYPES.includes(file.mimetype.toLowerCase())) {
        console.error("Invalid file type:", file.mimetype);
        res.writeHead(400, { "Content-Type": "application/json" });

        res.end(
          JSON.stringify({
            error: `Invalid image format: ${file.mimetype}. Please upload one of the allowed types: ${ALLOWED_EXTENSIONS}.`,
          })
        );

        // Clean up temporary file
        fs.unlink(file.filepath, (err) => {
          if (err) {
            console.error("Error deleting temp file:", err);
          }
        });

        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        console.error("File size exceeds limit:", file.size);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: `File size exceeds the limit of ${
              MAX_FILE_SIZE / (1024 * 1024)
            }MB.`,
          })
        );

        // Clean up temporary file
        fs.unlink(file.filepath, (err) => {
          if (err) {
            console.error("Error deleting temp file:", err);
          }
        });

        return;
      }

      fs.rename(file.filepath, newPath, (err) => {
        if (err) {
          console.error("Error saving image:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Error uploading image.",
            })
          );
          return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ filename: newPath.replace("uploads/", "") }));
      });
    });
  } else if (req.method === "GET" && url.pathname.startsWith("/images/")) {
    const filename = url.pathname.substring("/images/".length);
    const imagePath = `uploads/${filename}`;

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error("Error reading image:", err);
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Image not found.",
          })
        );
        return;
      }

      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Not found.",
      })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
