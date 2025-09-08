import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LocationMap from "../component/LocationMap";
import axios from "axios";

const initialPosts = [
  {
    author: "Ravi Kumar",
    location: "Delhi, India",
    title: "Potholes on Main Road",
    description:
      "Several deep potholes on MG Road causing accidents. Needs urgent repair.",
    image:
      "https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718",
    likes: 10,
    comments: 3,
    actionText: "View Details",
    category: "Infrastructure",
  },
  {
    author: "Neha Sharma",
    location: "Mumbai, India",
    title: "Overflowing Garbage Bins",
    description:
      "Garbage not collected for a week in Andheri East. Strong smell in the area.",
    image:
      "https://www.norcalcompactors.net/wp-content/uploads/2020/05/overflowing-garbage.jpg",
    likes: 18,
    comments: 7,
    actionText: "View Details",
    category: "Cleanliness",
  },
  {
    author: "Mohammed Ali",
    location: "Lucknow, India",
    title: "Streetlights not working",
    description:
      "Entire lane near Hazratganj is dark at night due to broken streetlights.",
    image:
      "https://media.istockphoto.com/id/496026170/photo/broken-street-lamp.jpg?s=612x612&w=0&k=20&c=1bX4binyYkD8P_ZzHbfRTspKowTIGoTkSjxvbcjAkY4=",
    likes: 7,
    comments: 2,
    actionText: "View Details",
    category: "Public Safety",
  },
  {
    author: "Priya Singh",
    location: "Chennai, India",
    title: "Tree Cutting in Park",
    description:
      "Old trees in Anna Nagar park being cut without notice. Residents protesting.",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop",
    likes: 22,
    comments: 5,
    actionText: "View Details",
    category: "Environment",
  },
  {
    author: "Ankit Verma",
    location: "Patna, India",
    title: "Broken School Building",
    description:
      "Government school in Kankarbagh has damaged classrooms. Unsafe for children.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80&auto=format&fit=crop",
    likes: 14,
    comments: 6,
    actionText: "View Details",
    category: "Education",
  },
  {
    author: "Sunita Devi",
    location: "Bhopal, India",
    title: "Water Supply Problem",
    description:
      "No water supply in Ashoka Colony since 3 days. Residents struggling.",
    image:
      "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&q=80&auto=format&fit=crop",
    likes: 11,
    comments: 4,
    actionText: "View Details",
    category: "Water & Drainage",
  },
  {
    author: "Rahul Mehta",
    location: "Jaipur, India",
    title: "Traffic Signal Not Working",
    description:
      "Signal at MI Road crossing is broken, causing traffic chaos during peak hours.",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80&auto=format&fit=crop",
    likes: 9,
    comments: 1,
    actionText: "View Details",
    category: "Traffic",
  },
];

const categories = [
  { icon: "category", label: "All Issues" },
  { icon: "edit_road", label: "Infrastructure" },
  { icon: "delete", label: "Cleanliness" },
  { icon: "security", label: "Public Safety" },
  { icon: "park", label: "Environment" },
  { icon: "school", label: "Education" },
  { icon: "water_drop", label: "Water & Drainage" },
  { icon: "traffic", label: "Traffic" },
];

const LokSabha = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("All Issues");
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState("Connaught Place, New Delhi, Delhi 110001, India");
  const [form, setForm] = useState({
    author: "",
    location: "",
    title: "",
    description: "",
    image: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  // category filter
  useEffect(() => {
    if (activeCategory === "All Issues") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, posts]);

  // keyboard + focus
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      setTimeout(() => firstFieldRef.current?.focus(), 0);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // preview lifecycle
  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.author) return;



    const img =
      imagePreview ||
      form.image.trim() ||
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80&auto=format&fit=crop";

    

    sendSms();

    const newPost = {
      author: form.author.trim(),
      location: form.location.trim() || "Unknown",
      title: form.title.trim(),
      description: form.description.trim(),
      image: img,
      likes: 0,
      comments: 0,
      actionText: "View Details",
      category: form.category || "Uncategorized",
    };

    setPosts((prev) => [newPost, ...prev]);
    setForm({
      author: "",
      location: "",
      title: "",
      description: "",
      image: "",
      category: "",
    });
    setImageFile(null);
    setImagePreview("");
    closeModal();
  };

  // like handler
  const handleLike = (idx) => {
    setPosts((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, likes: p.likes + 1 } : p))
    );
  };

const sendSms = async () => {
  try {
    const res = await axios.post("http://localhost:5000/send-sms");
    console.log("✅ SMS sent frontend!", res.data);
  } catch (err) {
    console.log("SMS frontend error:", err.response?.data || err.message);
  }
};

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-green-400 text-3xl">
            diversity_3
          </span>
          <h1 className="text-xl font-bold">CivicConnect</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Categories
          </h3>
          {categories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(item.label)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeCategory === item.label
                  ? "bg-green-500 text-gray-900"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="material-symbols-outlined text-gray-300">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-3xl font-bold">
            {activeCategory === "All Issues"
              ? "Community Feed"
              : activeCategory}
          </h2>
          <div className="flex items-center gap-6">
            <a className="text-gray-300 hover:text-white transition-colors" href="#" onClick={()=>navigate("/dashboard")}>
              Staff
            </a>
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="#"
              onClick={() => navigate("/profile")}
            >
              Profile
            </a>
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="#"
              onClick={() => navigate("/")}
            >
              Logout
            </a>
          
            <div
              className="bg-center bg-cover rounded-full border-2 border-gray-700 w-12 h-12"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/32.jpg")',
              }}
            ></div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
                >
                  <div
                    className="w-full h-48 bg-center bg-cover"
                    style={{ backgroundImage: `url(${post.image})` }}
                  ></div>
                  <div className="p-6">
                    <p className="text-gray-400 text-sm mb-1">
                      By {post.author} • {post.location}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-300 mb-4">{post.description}</p>
                    <div className="flex items-center justify-between text-gray-400">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(idx)}
                          className="flex items-center gap-2 hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            thumb_up
                          </span>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-white transition-colors">
                          <span className="material-symbols-outlined">
                            chat_bubble
                          </span>
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <button className="bg-green-400 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors">
                        {post.actionText}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No posts in this category.</p>
            )}
          </div>
        </div>
      </main>

      

      {/* Add Button */}
      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 bg-green-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
        aria-label="Add issue"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-post-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          {/* Dialog */}
          <div
            ref={dialogRef}
               className="relative z-10 overflow-y-scroll h-[90vh] w-full max-w-xl mx-4 
             rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl custom-scrollbar" >
            <div className="flex items-center justify-between p-5 border-b border-gray-700">
              <h3 id="add-post-title" className="text-xl font-semibold">
                Add New Post
              </h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="author" className="text-sm text-gray-300 mb-1">
                    Author *
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="author"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Your Name"
                  />
                </div>

                <div className="flex flex-col">
                  
                <LocationMap/>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm text-gray-300 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder="Post title"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm text-gray-300 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
                  placeholder="Write details..."
                />
              </div>

              {/* Category Selector */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select Category</option>
                  {categories
                    .filter((c) => c.label !== "All Issues")
                    .map((c, idx) => (
                      <option key={idx} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* Photo uploader */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-1">Photo</label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = "copy";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f && f.type.startsWith("image/")) setImageFile(f);
                  }}
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-600 rounded-xl bg-gray-900 hover:border-gray-500 cursor-pointer text-center px-4"
                >
                  <span className="material-symbols-outlined text-4xl text-gray-400">
                    cloud_upload
                  </span>
                  <p className="mt-1 font-semibold text-gray-200">Add a photo</p>
                  <p className="text-xs text-gray-400">
                    Drag and drop or click to upload
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && f.type.startsWith("image/")) setImageFile(f);
                  }}
                />

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
                      }}
                      className="px-3 py-1 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}

                
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-green-400 text-gray-900 font-bold hover:bg-opacity-90"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LokSabha;
