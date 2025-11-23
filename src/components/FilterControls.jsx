export default function FilterControls({
  pixelSize,
  setPixelSize,
  text,
  setText,
  onApply,
  onDownload,
}) {
  return (
    <div className="flex flex-col items-center space-y-5 mb-8">
      <div className="flex items-center gap-4">
        <label className="text-gray-300 font-medium">Pixel Size</label>
        <input
          type="range"
          min="2"
          max="32"
          value={pixelSize}
          onChange={(e) => setPixelSize(Number(e.target.value))}
          className="w-64 accent-purple-500"
        />
        <span className="text-sm text-gray-400">{pixelSize}</span>
      </div>

      <input
        type="text"
        placeholder="Enter caption text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-md px-4 py-2 w-64 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={onApply}
          className="bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold px-6 py-2 rounded-lg shadow-lg"
        >
          Apply Retro Filter
        </button>
        <button
          onClick={onDownload}
          className="bg-green-600 hover:bg-green-700 transition-all text-white font-semibold px-6 py-2 rounded-lg shadow-lg"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
}
