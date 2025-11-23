import { useState, useRef, useEffect } from "react";

export default function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [filter, setFilter] = useState("none");
  const [caption, setCaption] = useState("");
  const [tilt, setTilt] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

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
      // Medium size
      const imgWidth = 400;
      const imgHeight = (img.height / img.width) * imgWidth;
      const padding = 40; // sides/top
      const bottomPadding = 120; // Polaroid bottom
      const polaroidWidth = imgWidth + padding * 2;
      const polaroidHeight = imgHeight + padding + bottomPadding;

      canvas.width = polaroidWidth;
      canvas.height = polaroidHeight;

      // White Polaroid frame
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, polaroidWidth, polaroidHeight);

      // Shadow
      canvas.style.boxShadow = "10px 10px 30px rgba(0,0,0,0.5)";

      // Tilt
      ctx.save();
      ctx.translate(polaroidWidth / 2, polaroidHeight / 2);
      ctx.rotate((tilt * Math.PI) / 180);
      ctx.translate(-polaroidWidth / 2, -polaroidHeight / 2);

      // Apply retro filter
      switch (filter) {
        case "gameboy":
          ctx.filter = "contrast(1.2) saturate(0.2) hue-rotate(90deg)";
          break;
        case "vhs":
          ctx.filter = "contrast(1.1) saturate(1.3) hue-rotate(-20deg)";
          break;
        case "polaroid":
          ctx.filter = "brightness(1.1) saturate(0.9) sepia(0.2)";
          break;
        case "sepia":
          ctx.filter = "sepia(0.7) contrast(1.1)";
          break;
        case "cool":
          ctx.filter = "contrast(1.1) brightness(1.1) hue-rotate(200deg)";
          break;
        default:
          ctx.filter = "none";
      }

      ctx.drawImage(img, padding, padding, imgWidth, imgHeight);
      ctx.restore();
      ctx.filter = "none";

      // Caption
      ctx.font = "28px 'Press Start 2P', monospace";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(
        caption || "Retro Memories",
        polaroidWidth / 2,
        polaroidHeight - 70
      );

      // Date
      const date = new Date();
      const dateText = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      ctx.font = "20px 'Press Start 2P', monospace";
      ctx.fillStyle = "#444";
      ctx.fillText(dateText, polaroidWidth / 2, polaroidHeight - 40);
    };
  };

  const handleDownload = () => {
    drawPolaroid();
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = "retro-polaroid.png";
      link.href = canvasRef.current.toDataURL("image/png", 1.0);
      link.click();
    }, 300);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white p-6 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/20" />

      <div className="relative z-10 w-full max-w-2xl bg-black/40 border border-purple-700/40 rounded-3xl p-10 backdrop-blur-md shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 font-['Press_Start_2P'] tracking-widest">
          REALISTIC POLAROID 📸
        </h1>

        {/* Upload */}
        <label className="block cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 px-6 py-3 rounded-full text-sm font-semibold mx-auto w-fit shadow-lg mb-6">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            drawPolaroid();
          }}
          className="bg-black/60 border border-gray-700 text-sm px-4 py-2 rounded-full text-white font-mono focus:ring-2 focus:ring-purple-500 mb-4 w-3/4 mx-auto block"
        >
          <option value="none">No Filter</option>
          <option value="gameboy">GameBoy Green</option>
          <option value="vhs">VHS Glow</option>
          <option value="polaroid">Polaroid Warm</option>
          <option value="sepia">Sepia Vintage</option>
          <option value="cool">Cool Retro</option>
        </select>

        {/* Caption + Tilt */}
        <input
          type="text"
          placeholder="Add caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-black/50 border border-gray-700 rounded-full px-4 py-2 text-center text-xs text-white w-3/4 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono mb-3 mx-auto block"
        />

        <div className="flex items-center justify-center gap-3 mb-6">
          <label className="text-xs text-gray-400 font-mono">Tilt</label>
          <input
            type="range"
            min="-15"
            max="15"
            value={tilt}
            onChange={(e) => {
              setTilt(Number(e.target.value));
              drawPolaroid();
            }}
            className="w-48 accent-purple-500"
          />
          <span className="text-xs text-gray-400">{tilt}°</span>
        </div>

        <button
          onClick={handleDownload}
          className="mt-2 px-6 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white tracking-widest shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.8)] transition w-3/4 mx-auto block"
        >
          DOWNLOAD POLAROID
        </button>

        {/* Canvas */}
        <div className="relative mt-10 border border-purple-700/40 rounded-xl overflow-hidden bg-black/60 flex justify-center items-center min-h-[320px]">
          {imageSrc ? (
            <canvas ref={canvasRef} className="max-w-full rounded-md" />
          ) : (
            <p className="text-gray-500 text-xs font-mono">
              Upload an image to start!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
