const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Whitelisted output formats
const allowedFormats = [
  'mp4', 'm4a', 'mp4v', '3gp', '3g2', 'avi', 'mov', 'wmv',
  'mkv', 'flv', 'ogv', 'webm', 'h264', '264', 'hevc',
  'mp3', 'wav', 'ogg', 'aac', 'wma', 'flac'
];

app.post('/upload', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputFormat = req.body.outputFormat;

  if (!allowedFormats.includes(outputFormat)) {
    return res.status(400).send('Unsupported output format');
  }

  const outputPath = `uploads/${Date.now()}.${outputFormat}`;

  exec(`ffmpeg -i ${inputPath} ${outputPath}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Conversion failed.');
    }

    res.download(outputPath, `converted.${outputFormat}`, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
