import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import avatar from "../assets/avataaars-1757352915302.svg";
import translations from "../locales/i18n";
import toast, { Toaster } from "react-hot-toast";

import AddPost from "./AddPost";
import AIBot from "./AIBot";
import useUserStore from "../store/useUserStore";
import { getIssues, likeIssue } from "../api/issueApi";
import { logout } from "../api/userApi";

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
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("allIssues");
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const firstFieldRef = useRef(null);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  // Fetch issues from backend
  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const data = await getIssues({ ordering: "-priority_score,-created_at" });
      setPosts(data.results || []);
      setFilteredPosts(data.results || []);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
      toast.error("Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === "allIssues") {
      setFilteredPosts(posts);
    } else {
      // Map frontend categories to backend issue types
      const categoryMap = {
        infrastructure: "ROAD",
        cleanliness: "GARBAGE",
        publicSafety: "STREET_LIGHT",
        waterDrainage: "WATER",
      };
      
      const issueType = categoryMap[activeCategory];
      if (issueType) {
        setFilteredPosts(posts.filter((p) => p.issue_type === issueType));
      } else {
        setFilteredPosts(posts);
      }
    }
  }, [activeCategory, posts]);

  useEffect(() => {
    // Language change doesn't affect backend data
    // Just update UI translations
  }, [language]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission is now handled in AddPost component
    closeModal();
    // Refresh issues after adding
    fetchIssues();
  };

  const handleLike = async (issueId, idx) => {
    try {
      const res = await likeIssue(issueId);
      toast.success(res.liked ? "Issue liked!" : "Issue unliked!");
      
      // Update local state
      setPosts((prev) =>
        prev.map((p) =>
          p.id === issueId
            ? { ...p, likes_count: res.liked ? p.likes_count + 1 : p.likes_count - 1, is_liked: res.liked }
            : p
        )
      );
    } catch (error) {
      console.error("Failed to like issue:", error);
      toast.error("Failed to like issue");
    }
  };

  const handleLogout = () => {
    logout();
    clearUser();
    navigate("/login");
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a]">
      <Toaster position="top-right" />
      <div className="flex h-screen text-white font-sans overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 w-64 bg-gray-800 p-6 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-20 lg:translate-x-0 flex flex-col`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-3xl">
                diversity_3
              </span>
              <h1 className="text-xl font-bold">Lok Bandhu</h1>
            </div>
            <button
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
              {t.categories.allIssues === "All Issues"
                ? "Categories"
                : "श्रेणियाँ"}
            </h3>
            {categories.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(item.key);
                  setSidebarOpen(false);
                }}
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
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex flex-wrap items-center justify-between gap-2 p-4 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
            {/* Left side */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                className="lg:hidden text-gray-300 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
              <h2 className="text-xl md:text-2xl font-bold truncate">
                {activeCategory === "allIssues"
                  ? t.header.lokSabha
                  : t.categories[activeCategory]}
              </h2>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-wrap justify-end flex-1">
              {/* Desktop Nav */}
              <div className="hidden sm:flex gap-4">
                {user?.role === "GOVT" && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {t.header.staff}
                  </button>
                )}
                <button
                  onClick={() => navigate("/profile")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.header.profile}
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t.header.logout}
                </button>
              </div>

              {/* Mobile Dropdown */}
              <div className="relative sm:hidden">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="text-gray-300 hover:text-white border border-gray-600 rounded px-3 py-1 text-sm flex items-center"
                >
                  {t.header.lokSabha}
                  <span className="ml-1">▾</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-30">
                    {user?.role === "GOVT" && (
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate("/dashboard");
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        {t.header.staff}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      {t.header.profile}
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                    >
                      {t.header.logout}
                    </button>
                  </div>
                )}
              </div>

              {/* Language Dropdown */}
              <select
                className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm"
                value={language}
                onChange={handleLanguageChange}
              >
                <option value="en">EN</option>
                <option value="hi">हिन्दी</option>
              </select>

              {/* Profile Pic */}
              <div
                className="bg-center bg-cover rounded-full border-2 border-gray-700 w-9 h-9 md:w-10 md:h-10 flex-shrink-0"
                style={{ backgroundImage: `url(${avatar})` }}
              ></div>
            </div>
          </header>

          {/* Posts */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
              {loading ? (
                <div className="text-center text-gray-400">Loading issues...</div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post, idx) => (
                  <div
                    key={post.id}
                    className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
                  >
                    {post.image && (
                      <div
                        className="w-full h-40 md:h-48 bg-center bg-cover"
                        style={{ backgroundImage: `url(${post.image})` }}
                      ></div>
                    )}
                    <div className="p-4 md:p-6">
                      <p className="text-gray-400 text-sm mb-1">
                        {t.posts.author.split("*")[0]} {post.created_by_name} •{" "}
                        {post.address || "Unknown location"}
                      </p>
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 mb-2">{post.description}</p>
                      <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {post.issue_type}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.status === "RESOLVED" ? "bg-green-500/20 text-green-400" :
                          post.status === "IN_PROGRESS" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-gray-500/20 text-gray-400"
                        }`}>
                          {post.status}
                        </span>
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                          Priority: {post.priority_score}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-gray-400">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id, idx)}
                            className={`flex items-center gap-2 hover:text-white transition-colors ${
                              post.is_liked ? "text-green-400" : ""
                            }`}
                          >
                            <span className="material-symbols-outlined">
                              {post.is_liked ? "thumb_up" : "thumb_up"}
                            </span>
                            <span>{post.likes_count}</span>
                          </button>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined">
                              person
                            </span>
                            <span className="text-sm">{post.current_authority_name || "Unassigned"}</span>
                          </div>
                        </div>
                        <button className="bg-green-400 text-gray-900 font-bold py-1.5 px-3 md:py-2 md:px-4 rounded-full hover:bg-opacity-90 transition-colors text-sm md:text-base">
                          {t.posts.viewDetails}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center">{t.posts.noPosts}</p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* AI Bot */}
      <AIBot t={t} />

      {/* Add Button - Only for PUBLIC users (citizens) */}
      {user?.role === "PUBLIC" && (
        <button
          onClick={openModal}
          className="fixed bottom-6 right-6 bg-green-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors z-30"
          aria-label="Add issue"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}

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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <AddPost
            t={t}
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            categories={categories}
            closeModal={closeModal}
            setImageFile={setImageFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            firstFieldRef={firstFieldRef}
            onSuccess={fetchIssues}
          />
        </div>
      )}
    </div>
  );
};

export default LokSabha;
