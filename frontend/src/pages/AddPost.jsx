import { useRef, useState } from "react";
import LocationMap from "../component/LocationMap";
import VoiceReport from "../component/VoiceReport";
import ImageDescription from "../component/ImageDescription";
import AnimatedTextLoader from "../component/AnimatedTextLoader";
import { createIssue } from "../api/issueApi";
import toast from "react-hot-toast";

const AddPost = ({
  t,
  form,
  handleChange,
  handleSubmit,
  categories,
  closeModal,
  setImageFile,
  imagePreview,
  setImagePreview,
  firstFieldRef,
  setForm,
  onSuccess,
}) => {
  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isLoadingDis, setLoadingDis] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title || form.description.substring(0, 50));
      formData.append("description", form.description);
      formData.append("latitude", form.latitude || 28.6139);
      formData.append("longitude", form.longitude || 77.2090);
      formData.append("address", form.location || "Unknown");
      
      // Map category to issue_type
      const categoryMap = {
        [t.categories.infrastructure]: "ROAD",
        [t.categories.cleanliness]: "GARBAGE",
        [t.categories.publicSafety]: "STREET_LIGHT",
        [t.categories.waterDrainage]: "WATER",
      };
      
      const issueType = categoryMap[form.category] || "ROAD";
      formData.append("issue_type", issueType);
      formData.append("location_type", "URBAN");

      // Add image if exists
      if (fileInputRef.current?.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      const res = await createIssue(formData);
      console.log("Issue created:", res);
      
      toast.success("Issue reported successfully!");
      
      // Reset form
      setForm({
        author: "",
        location: "",
        title: "",
        description: "",
        image: "",
        category: "",
        latitude: "",
        longitude: "",
      });
      setImagePreview("");
      
      if (onSuccess) onSuccess();
      closeModal();
    } catch (error) {
      console.error("Failed to create issue:", error);
      toast.error(error.response?.data?.detail || "Failed to report issue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={dialogRef}
      className="relative z-10 overflow-y-scroll h-[90vh] w-full max-w-xl mx-4 
       rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl custom-scrollbar text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <h3 id="add-post-title" className="text-xl font-semibold">
          {t.posts.addNew}
        </h3>
        <button
          onClick={closeModal}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
        {/* Author + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="author" className="text-sm mb-1">
              {t.posts.author}
            </label>
            <input
              ref={firstFieldRef}
              id="author"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
              placeholder={t.posts.author}
            />
          </div>
          <LocationMap />
        </div>

        {/* Photo uploader + auto description generator */}
        <ImageDescription
          t={t}
          setImageFile={setImageFile}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          fileInputRef={fileInputRef}
          setForm={setForm}
          setLoadingDis={setLoadingDis}
        />

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm mb-1">
            {t.posts.category}
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
          >
            <option value="">{t.posts.selectCategory}</option>
            {categories
              .filter((c) => c.key !== "allIssues")
              .map((c, idx) => (
                <option key={idx} value={t.categories[c.key]}>
                  {t.categories[c.key]}
                </option>
              ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col relative">
          <label htmlFor="description" className="text-sm mb-1">
            {t.posts.description}
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            disabled={isLoadingDis} // prevent typing while generating
            className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 resize-y text-white placeholder-gray-400"
            placeholder={isLoadingDis ? "" : t.posts.description}
          />

          {/* Loader overlay */}
          {isLoadingDis && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 rounded-lg">
              <AnimatedTextLoader />
            </div>
          )}
        </div>

        <VoiceReport />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700"
          >
            {t.posts.cancel}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-full bg-green-400 text-gray-900 font-bold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : t.posts.post}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
