const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Whitelisted output formats
const allowedFormats = [
  'mp4', 'm4a', 'mp4v', '3gp', '3g2', 'avi', 'mov', 'wmv',
  'mkv', 'flv', 'ogv', 'webm', 'h264', '264', 'hevc',
  'mp3', 'wav', 'ogg', 'aac', 'wma', 'flac'
];

// Root route for test
app.get("/", (req, res) => {
  res.send("✅ TransCodeX backend is running");
});

app.post('/upload', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputFormat = req.body.outputFormat;

  if (!allowedFormats.includes(outputFormat)) {
    return res.status(400).send('Unsupported output format');
  }

  const outputPath = `uploads/${Date.now()}.${outputFormat}`;

  exec(`ffmpeg -i ${inputPath} ${outputPath}`, (err) => {
    if (err) {
      console.error('❌ FFmpeg Error:', err.message);
      return res.status(500).send('Conversion failed.');
    }

    res.download(outputPath, `converted.${outputFormat}`, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
