import { useState, useRef, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [filter, setFilter] = useState("none");
  const [caption, setCaption] = useState("");
  const [tilt, setTilt] = useState(0);
  const [font, setFont] = useState("Press Start 2P");
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fonts = [
      "Press Start 2P",
      "Roboto Mono",
      "Dancing Script",
      "Pacifico",
      "Great Vibes",
      "Montserrat Alternates",
      "Lobster",
    ];
    fonts.forEach((f) => {
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${f.replace(
        / /g,
        "+"
      )}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    if (imageSrc) drawPolaroid();
  }, [imageSrc, filter, caption, tilt, font, zoom, offsetX, offsetY]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const drawPolaroid = () => {
    if (!canvasRef.current || !imageSrc) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const imgWidth = 400;
      const imgHeight = (img.height / img.width) * imgWidth;
      const padding = 35;
      const bottomPadding = 110;
      const width = imgWidth + padding * 2;
      const height = imgHeight + padding + bottomPadding;

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 20);
      ctx.fill();

      canvas.style.boxShadow = "0 12px 30px rgba(168,85,247,0.35)";
      ctx.save();

      ctx.translate(width / 2, height / 2);
      ctx.rotate((tilt * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);

      const filters = {
        none: "none",
        gameboy: "contrast(1.2) saturate(0.3) hue-rotate(90deg)",
        vhs: "contrast(1.1) saturate(1.3) hue-rotate(-20deg)",
        polaroid: "brightness(1.1) saturate(0.9) sepia(0.25)",
        sepia: "sepia(0.8) contrast(1.1)",
        cool: "contrast(1.1) brightness(1.1) hue-rotate(200deg)",
        vaporwave: "contrast(1.2) brightness(1.2) hue-rotate(290deg) saturate(1.5)",
        noir: "grayscale(1) contrast(1.3)",
        sunset: "brightness(1.1) sepia(0.5) hue-rotate(-15deg) saturate(1.2)",
        pastel: "saturate(0.8) brightness(1.15) contrast(0.9)",
        warmfade: "brightness(1.05) sepia(0.3) saturate(1.1) contrast(0.95)",
      };
      ctx.filter = filters[filter];

      const scaledWidth = imgWidth * zoom;
      const scaledHeight = imgHeight * zoom;
      const x = padding + offsetX;
      const y = padding + offsetY;
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      ctx.restore();
      ctx.filter = "none";

      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.font = `26px '${font}', sans-serif`;
      ctx.fillText(caption || "My Polaroid", width / 2, height - 70);

      const dateText = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      ctx.font = `20px '${font}', sans-serif`;
      ctx.fillStyle = "#666";
      ctx.fillText(dateText, width / 2, height - 35);
    };
  };

  const handleDownload = () => {
    if (!canvasRef.current || !imageSrc) return;
    const link = document.createElement("a");
    link.download = "retro-polaroid.png";
    link.href = canvasRef.current.toDataURL("image/png", 1.0);
    link.click();
  };

  const handleReset = () => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setTilt(0);
    setFilter("none");
    setFont("Press Start 2P");
    setCaption("");
    setImageSrc(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#0e0e14] text-white p-4 relative overflow-hidden">
      <Header />

      {/* Background Neon Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a28]/40 via-[#0e0e14]/20 to-[#1a1a28]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl transition-all duration-700 ease-in-out">
        {!imageSrc && (
          <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full text-white font-bold text-lg mb-6 transition-all">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        )}

        {imageSrc && (
          <div className="relative w-full bg-[#1b1b27]/80 border border-[#444]/50 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.25)] flex flex-col items-center transition-all duration-700">
            {/* Filters + Font */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-[#111]/50 border border-[#555]/50 text-sm px-4 py-2 rounded-full text-white font-mono focus:ring-2 focus:ring-purple-400 transition"
              >
                <option value="none">No Filter</option>
                <option value="gameboy">GameBoy</option>
                <option value="vhs">VHS Glow</option>
                <option value="polaroid">Polaroid Warm</option>
                <option value="sepia">Sepia Vintage</option>
                <option value="cool">Cool Retro</option>
                <option value="vaporwave">Vaporwave Neon</option>
                <option value="noir">Noir Classic</option>
                <option value="sunset">Sunset Glow</option>
                <option value="pastel">Pastel Dream</option>
                <option value="warmfade">Warm Fade</option>
              </select>

              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="bg-[#111]/50 border border-[#555]/50 text-sm px-4 py-2 rounded-full text-white font-mono focus:ring-2 focus:ring-purple-400 transition"
              >
                <option value="Press Start 2P">Pixel Retro</option>
                <option value="Roboto Mono">Mono Modern</option>
                <option value="Dancing Script">Handwritten</option>
                <option value="Pacifico">Cursive Fun</option>
                <option value="Great Vibes">Elegant Script</option>
                <option value="Montserrat Alternates">Modern Sans</option>
                <option value="Lobster">Retro Bold</option>
              </select>
            </div>

            {/* Caption */}
            <input
              type="text"
              placeholder="Add caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="bg-[#111]/50 border border-[#555]/50 rounded-full px-4 py-2 text-center text-xs text-white w-3/4 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono mb-4 mx-auto block transition"
            />

            {/* Image adjustments */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-xs text-gray-400 font-mono justify-items-center w-full">
              <div>
                <label>Zoom</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-28 accent-purple-400"
                />
              </div>
              <div>
                <label>Move X</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={offsetX}
                  onChange={(e) => setOffsetX(Number(e.target.value))}
                  className="w-28 accent-purple-400"
                />
              </div>
              <div>
                <label>Move Y</label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  className="w-28 accent-purple-400"
                />
              </div>
            </div>

            {/* Tilt */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <label className="text-xs text-gray-400 font-mono">Tilt</label>
              <input
                type="range"
                min="-15"
                max="15"
                value={tilt}
                onChange={(e) => setTilt(Number(e.target.value))}
                className="w-48 accent-purple-400"
              />
              <span className="text-xs text-gray-400">{tilt}°</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 w-full">
              <button
                onClick={handleDownload}
                className="px-6 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-green-500 to-teal-400 text-white tracking-widest shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] transition"
              >
                DOWNLOAD
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white tracking-widest shadow-lg hover:shadow-[0_0_20px_rgba(107,114,128,0.8)] transition"
              >
                RESET
              </button>
            </div>

            {/* Canvas */}
            <div className="relative mt-6 flex justify-center items-center min-h-[350px] w-full">
              <canvas
                ref={canvasRef}
                className="max-w-full rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.01]"
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
