import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        className="px-4 py-2 bg-green-400 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Create Post
      </button>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default App;
