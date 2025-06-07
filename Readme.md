# TransCodeX

A privacy-focused, browser-based media converter for audio and video files. Convert locally without uploads or restrictions.

## Features

- **Local Processing** - Files never leave your device
- **Multiple Formats** - Support for all major audio/video formats
- **No Limits** - Unlimited conversions with no file size caps
- **Modern UI** - Clean interface with dark/light mode

## Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/jishkhar/transcodex.git
   cd transcodex
   
   # Install frontend
   cd client && npm install
   
   # Install backend
   cd ../server && npm install
   ```

2. **Run the application**
   ```bash
   # Terminal 1 - Backend
   cd server && npm start
   
   # Terminal 2 - Frontend  
   cd client && npm run dev
   ```

3. **Open** `http://localhost:3000`

## Supported Formats

**Audio:** MP3, WAV, OGG, AAC, WMA, FLAC, M4A  
**Video:** MP4, AVI, MOV, WMV, MKV, FLV, WEBM, and more

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, FFmpeg
- **Icons:** Lucide React

## Usage

1. Drag & drop or select your media file
2. Choose output format from dropdown
3. Click convert and download the result

## Development

The project uses a React frontend with a Node.js backend for media processing.

```
transcodex/
├── client/     # React frontend
└── server/     # Express backend
```

## License

MIT License - see [LICENSE](LICENSE) file.

## Author

**Jishnu Khargharia**  
Portfolio: [jishnu.tech](https://www.jishnu.tech/) | GitHub: [@jishkhar](https://github.com/jishkhar)