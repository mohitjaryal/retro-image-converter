export default function RetroCanvas({ canvasRef, imageSrc }) {
  return (
    <div className="border-4 border-gray-700 rounded-xl p-2 shadow-xl bg-black/40 flex justify-center items-center min-h-[300px]">
      {imageSrc ? (
        <canvas ref={canvasRef} className="max-w-full rounded-lg" />
      ) : (
        <p className="text-gray-500 italic">Upload an image to start!</p>
      )}
    </div>
  );
}
