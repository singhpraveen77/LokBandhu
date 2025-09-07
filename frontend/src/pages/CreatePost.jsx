import React, { useState } from "react";

const CreatePostModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl" style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Create a new post</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-gray-600">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Post Description */}
          <div>
            <label htmlFor="post-description" className="sr-only">Post description</label>
            <textarea
              id="post-description"
              rows="5"
              placeholder="What's on your mind?"
              className="form-textarea w-full resize-none rounded-xl border-gray-300 bg-gray-50 p-4 text-base text-gray-800 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 transition duration-150"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-48 p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition duration-150"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
                <p className="mb-2 text-lg font-semibold text-gray-700">Add a photo</p>
                <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
              </div>
              <input id="image-upload" type="file" className="hidden" />
            </label>
          </div>

          {/* Location Tag */}
          <div className="relative">
            <label htmlFor="location-tag" className="sr-only">Tag a location</label>
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">location_on</span>
            <input
              id="location-tag"
              type="text"
              placeholder="Tag a location"
              className="form-input w-full rounded-xl border-gray-300 bg-gray-50 pl-12 pr-4 py-3.5 text-base text-gray-800 placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 transition duration-150"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          <button
            className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition duration-150"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition duration-150">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
