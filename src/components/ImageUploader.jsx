export default function ImageUploader({ onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-6">
      <label className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 px-6 py-2 rounded-lg text-white font-semibold cursor-pointer transition-all shadow-lg">
        Upload Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}
