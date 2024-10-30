const http = require("http");
const fs = require("fs");
const { formidable } = require("formidable");

const port = 3001;

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

      fs.rename(file.filepath, newPath, (err) => {
        if (err) {
          console.error("Error saving image:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error uploading image.");
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
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Image not found.");
        return;
      }

      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found.");
  }
});

server.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
