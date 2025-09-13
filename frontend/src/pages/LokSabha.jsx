import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LocationMap from "../component/LocationMap";
import axios from "axios";
import VoiceReport from "../component/VoiceReport";
import avatar from "../assets/avataaars-1757352915302.svg";
import translations from "../locales/i18n";
import AIBot from "./AIBot";

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
  { icon: "category", key: "allIssues" },
  { icon: "edit_road", key: "infrastructure" },
  { icon: "delete", key: "cleanliness" },
  { icon: "security", key: "publicSafety" },
  { icon: "park", key: "environment" },
  { icon: "school", key: "education" },
  { icon: "water_drop", key: "waterDrainage" },
  { icon: "traffic", key: "traffic" },
];

const LokSabha = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const t = translations[language];
  
  const navigate = useNavigate();

  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("allIssues");
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState(
    "Connaught Place, New Delhi, Delhi 110001, India"
  );
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

  useEffect(() => {
    if (activeCategory === "allIssues") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.category === t.categories[activeCategory]));
    }
  }, [activeCategory, posts, t]);

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

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      
      <style>{`
        @keyframes typingReveal {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes caret {
          0%, 100% { border-color: transparent }
          50% { border-color: rgba(255,255,255,0.9) }
        }
        .tw-typewriter {
          overflow: hidden;
          white-space: nowrap;
          width: 0;
          border-right: 2px solid rgba(255,255,255,0.9);
          animation-fill-mode: forwards;
        }
        .tw-typewriter-run {
          animation:
            typingReveal 1.6s steps(24) forwards,
            caret 1s step-end infinite;
        }
      `}</style>

      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-green-400 text-3xl">
            diversity_3
          </span>
          <h1 className="text-xl font-bold">Lok Bandhu</h1>
        </div>

        <nav className="flex flex-col gap-2">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
            {t.categories.allIssues === "All Issues" ? "Categories" : "श्रेणियाँ"}
          </h3>
          {categories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(item.key)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeCategory === item.key
                  ? "bg-green-500 text-gray-900"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="material-symbols-outlined text-gray-300">
                {item.icon}
              </span>
              <span>{t.categories[item.key]}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-3xl font-bold">
            {activeCategory === "allIssues" ? t.header.lokSabha : t.categories[activeCategory]}
          </h2>
          <div className="flex items-center gap-6">
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="#"
              onClick={() => navigate("/dashboard")}
            >
              {t.header.staff}
            </a>
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="#"
              onClick={() => navigate("/profile")}
            >
              {t.header.profile}
            </a>
            <select
              className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>

            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="#"
              onClick={() => navigate("/")}
            >
              {t.header.logout}
            </a>
            

            <div
              className="bg-center bg-cover rounded-full border-2 border-gray-700 w-12 h-12"
              style={{
                backgroundImage: `url(${avatar})`,
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
                      {t.posts.author.split('*')[0]} {post.author} • {post.location}
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
                        {t.posts.viewDetails}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">{t.posts.noPosts}</p>
            )}
          </div>
        </div>
      </main>

      {/* AI Bot with tooltip centered over bot, arrow pointing to bot center */}
      <AIBot t={t}/>
      {/* <div className="fixed bottom-28 right-19 z-50 group">
        <button
          type="button"
          aria-label="AI assistant"
          onClick={() => {
            // open AI panel/modal if needed
          }}
          className="shadow-none focus:outline-none focus:ring-2 focus:ring-green-400 bg-transparent"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="AI bot"
            className="w-20 h-20 rounded-none bg-transparent transition-transform duration-200 hover:scale-105"
          />
        </button>

      //   Tooltip bubble centered over bot 
        <div className="absolute bottom-[104px] left-1/4 -translate-x-1/2 hidden group-hover:block">
          <div className="relative bg-black text-white rounded-md shadow-lg px-4 py-2 max-w-[80vw] text-left">
            <div
              className="tw-typewriter tw-typewriter-run font-bold text-lg md:text-xl"
              style={{ display: "inline-block" }}
            >
              {t.posts.helpText}
            </div>
            // Arrow centered to bot 
            <div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black" />
          </div>
        </div>
      </div> */}

      {/* Add Button */}
      <button
        onClick={openModal}
        className="fixed bottom-8 right-22 bg-green-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors"
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
             rounded-2xl bg-gray-800 border border-gray-700 shadow-2xl custom-scrollbar"
          >
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

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="author" className="text-sm text-gray-300 mb-1">
                    {t.posts.author}
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="author"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder={t.posts.author}
                  />
                </div>

                <div className="flex flex-col">
                  <LocationMap />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm text-gray-300 mb-1">
                  {t.posts.title}
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  placeholder={t.posts.title}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm text-gray-300 mb-1"
                >
                  {t.posts.description}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
                  placeholder={t.posts.description}
                />
              </div>
              <VoiceReport />

              {/* Category Selector */}
              <div className="flex flex-col">
                <label htmlFor="category" className="text-sm text-gray-300 mb-1">
                  {t.posts.category}
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
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

              {/* Photo uploader */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-300 mb-1">{t.posts.photo}</label>

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
                  <p className="mt-1 font-semibold text-gray-200">{t.posts.addPhoto}</p>
                  <p className="text-xs text-gray-400">
                    {t.posts.dragDrop}
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
                      {t.posts.remove}
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
                  {t.posts.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-green-400 text-gray-900 font-bold hover:bg-opacity-90"
                >
                  {t.posts.post}
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