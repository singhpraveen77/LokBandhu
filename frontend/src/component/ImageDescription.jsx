import axios from "axios";

export default function ImageDescription({
  t,
  setImageFile,
  imagePreview,
  setImagePreview,
  fileInputRef,
  setForm,
  setLoadingDis,
}) {
  const handleFileSelect = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    // set image & preview
    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    try {
      // start loader
      setLoadingDis(true);

      // call backend
      const res = await axios.post("http://localhost:5000/api/generate-description", {
        imageName: file.name,
      });

      // wait minimum 2 sec before showing description
      setTimeout(() => {
        setForm((prev) => ({
          ...prev,
          category: t.categories[res.data.category],
          description: res.data.description,
        }));
        setLoadingDis(false);
      }, 2000);
    } catch (err) {
      console.error("Error generating description:", err);
      setLoadingDis(false);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-300 mb-1">{t.posts.photo}</label>

      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(e) => {
          e.preventDefault();
          const f = e.dataTransfer.files?.[0];
          handleFileSelect(f);
        }}
        className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-600 rounded-xl bg-gray-900 hover:border-gray-500 cursor-pointer text-center px-4"
      >
        <span className="material-symbols-outlined text-4xl text-gray-400">
          cloud_upload
        </span>
        <p className="mt-1 font-semibold text-gray-200">{t.posts.addPhoto}</p>
        <p className="text-xs text-gray-400">{t.posts.dragDrop}</p>
      </div>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
      />

      {/* Preview */}
      {imagePreview && (
        <div className="mt-3 flex items-center gap-3">
          <div
            className="w-20 h-14 bg-cover bg-center rounded-lg border border-gray-700"
            style={{ backgroundImage: `url(${imagePreview})` }}
          />
          <button
            type="button"
            onClick={() => {
              setImageFile(null);
              setImagePreview("");
              setForm((prev) => ({ ...prev, category: "", description: "" }));
            }}
            className="px-3 py-1 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700 text-sm"
          >
            {t.posts.remove}
          </button>
        </div>
      )}
    </div>
  );
}
