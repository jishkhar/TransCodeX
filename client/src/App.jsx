import { useState, useRef, useEffect } from "react"
import {
  Moon,
  Sun,
  Upload,
  FileText,
  ImageIcon,
  Video,
  Music,
  Zap,
  Shield,
  Layers,
  Github,
  ExternalLink,
} from "lucide-react"

const audioFormats = ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"]
const videoFormats = [
  "mp4",
  "mp4v",
  "3gp",
  "3g2",
  "avi",
  "mov",
  "wmv",
  "mkv",
  "flv",
  "ogv",
  "webm",
  "h264",
  "264",
  "hevc",
]

export default function Index() {
  const [file, setFile] = useState(null)
  const [outputFormat, setOutputFormat] = useState("mp3")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("audio")
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const dropdownRef = useRef()
  const fileInputRef = useRef()

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", closeOnClickOutside)
    return () => document.removeEventListener("mousedown", closeOnClickOutside)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const getFormats = () => (activeTab === "audio" ? audioFormats : videoFormats)

  const handleConvert = async () => {
    if (!file) return alert("Please select a file")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("outputFormat", outputFormat)

    setLoading(true)

    try {
      const response = await fetch("https://transcodex.onrender.com", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Conversion failed.")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `converted.${outputFormat}`
      a.click()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const getFileIcon = (fileName) => {
    if (!fileName) return FileText
    const ext = fileName.split(".").pop()?.toLowerCase()
    if (audioFormats.includes(ext)) return Music
    if (videoFormats.includes(ext)) return Video
    return ImageIcon
  }

  const FileIcon = getFileIcon(file?.name)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        {/* Navbar */}
        <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TransCodeX
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <a
                  href="https://www.jishnu.tech/"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="font-medium">Portfolio</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-24 px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                All-in-One Media Converter
              </span>
              <span className="block text-3xl sm:text-4xl mt-4 text-gray-700 dark:text-gray-300 font-medium">
                No Limits, No Compromise
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
              Convert images, music, and videos right in your browser—no caps, no delays, no worries.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-25 animate-ping"></div>
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center relative z-10 shadow-lg">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Blazing Fast Performance</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  Get instant results with on-the-spot file processing—no uploads, no waiting.
                </p>
              </div>

              <div className="flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-25 animate-pulse"></div>
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center relative z-10 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Your Files, Your Device</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  We value your privacy. Everything happens locally, so your media stays secure and never leaves your
                  computer.
                </p>
              </div>

              <div className="flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-purple-400 rounded-full opacity-25 animate-bounce"></div>
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center relative z-10 shadow-lg">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">Universal Format Support</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  Easily handle all popular image, audio, and video file types—no need to install anything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Converter Section */}
        <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Start Converting Now</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Drop your files below and select your desired output format
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
                  dragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02] shadow-lg"
                    : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-md"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input ref={fileInputRef} type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" />

                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <FileIcon className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-2xl font-medium text-gray-900 dark:text-white mb-3">{file.name}</p>
                    <p className="text-lg text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Upload className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-2xl font-medium text-gray-900 dark:text-white mb-3">No file chosen</p>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">Drag & drop files here</p>
                    <p className="text-gray-400 dark:text-gray-500 mb-6">Or click to browse your device</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl">
                      Supports images, audio, and videos in all major formats
                    </p>
                  </div>
                )}
              </div>

              {/* Format Selection */}
              <div className="mt-10">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Select Output Format
                </label>
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl px-6 py-4 text-left shadow-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-xl flex items-center justify-between font-medium text-lg"
                  >
                    <span className="font-semibold">{outputFormat.toUpperCase()}</span>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="flex border-b border-gray-200 dark:border-gray-600">
                        <button
                          className={`flex-1 px-6 py-4 text-lg font-medium transition-all duration-300 ${
                            activeTab === "audio"
                              ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                          }`}
                          onClick={() => setActiveTab("audio")}
                        >
                          Audio
                        </button>
                        <button
                          className={`flex-1 px-6 py-4 text-lg font-medium transition-all duration-300 ${
                            activeTab === "video"
                              ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                          }`}
                          onClick={() => setActiveTab("video")}
                        >
                          Video
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {getFormats().map((format) => (
                          <button
                            key={format}
                            className={`w-full px-6 py-4 text-left text-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 ${
                              format === outputFormat
                                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium"
                                : "font-medium"
                            }`}
                            onClick={() => {
                              setOutputFormat(format)
                              setDropdownOpen(false)
                            }}
                          >
                            {format.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={loading || !file}
                className="w-full mt-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100 shadow-xl hover:shadow-2xl text-lg relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 -translate-x-full group-hover:animate-shimmer"></span>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Converting...
                  </div>
                ) : (
                  "Convert File"
                )}
              </button>
            </div>
          </div>
        </section>

        {/* About Developer Section */}
        <section className="py-20 px-6 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">About the Developer</h2>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                  <span className="text-3xl font-bold text-white">JK</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Hi there! I'm Jishnu Khargharia</h3>
                <p className="text-xl text-blue-600 dark:text-blue-400 mb-8 font-medium">
                  Developer
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl leading-relaxed">
                  I'm passionate about creating useful tools that respect user privacy. TransCodeX was built with a
                  simple goal: to provide a completely free and unlimited file conversion tool that works directly in
                  your browser—no uploads, no restrictions, no tracking.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-2xl">
                  <div className="flex flex-col items-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
                    <code className="text-blue-600 dark:text-blue-400 text-xl font-bold mb-2">&lt;/&gt;</code>
                    <span className="font-medium">Web Developer</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-700">
                    <Shield className="h-6 w-6 text-green-600 mb-2" />
                    <span className="font-medium">Privacy Focused</span>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-700">
                    <Github className="h-6 w-6 text-purple-600 mb-2" />
                    <span className="font-medium">Open Source</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://github.com/jishkhar"
                    target="_blank"
                    className="flex items-center space-x-3 bg-gray-900 dark:bg-gray-700 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.jishnu.tech/"
                    target="_blank"
                    className="flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Visit My Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 py-12 px-6 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              © 2024 TransCodeX by k_jish. Built with <span className="text-red-500 animate-pulse">❤️</span> for
              the community.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}