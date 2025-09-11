import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LocationMap from "../component/LocationMap";
import axios from "axios";
import VoiceReport from "../component/VoiceReport";

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
    if (activeCategory === "All Issues") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, posts]);

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
            {activeCategory === "All Issues" ? "Lok Sabha" : activeCategory}
          </h2>
          <div className="flex items-center gap-6">
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="#"
              onClick={() => navigate("/dashboard")}
            >
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
                  'url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20280%20280%22%20fill%3D%22none%22%20shape-rendering%3D%22auto%22%3E%3Cmetadata%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Adcterms%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%22%3E%3Crdf%3ARDF%3E%3Crdf%3ADescription%3E%3Cdc%3Atitle%3EAvataaars%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3EPablo%20Stanley%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Favataaars.com%2F%3C%2Fdc%3Asource%3E%3Cdcterms%3Alicense%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Favataaars.com%2F%3C%2Fdcterms%3Alicense%3E%3Cdc%3Arights%3ERemix%20of%20%E2%80%9EAvataaars%E2%80%9D%20(https%3A%2F%2Favataaars.com%2F)%20by%20%E2%80%9EPablo%20Stanley%E2%80%9D%2C%20licensed%20under%20%E2%80%9EFree%20for%20personal%20and%20commercial%20use%E2%80%9D%20(https%3A%2F%2Favataaars.com%2F)%3C%2Fdc%3Arights%3E%3C%2Frdf%3ADescription%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22viewboxMask%22%3E%3Crect%20width%3D%22280%22%20height%3D%22280%22%20rx%3D%220%22%20ry%3D%220%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23viewboxMask)%22%3E%3Cg%20transform%3D%22translate(8)%22%3E%3Cpath%20d%3D%22M132%2036a56%2056%200%200%200-56%2056v6.17A12%2012%200%200%200%2066%20110v14a12%2012%200%200%200%2010.3%2011.88%2056.04%2056.04%200%200%200%2031.7%2044.73v18.4h-4a72%2072%200%200%200-72%2072v9h200v-9a72%2072%200%200%200-72-72h-4v-18.39a56.04%2056.04%200%200%200%2031.7-44.73A12%2012%200%200%200%20198%20124v-14a12%2012%200%200%200-10-11.83V92a56%2056%200%200%200-56-56Z%22%20fill%3D%22%23edb98a%22%2F%3E%3Cpath%20d%3D%22M108%20180.61v8a55.79%2055.79%200%200%200%2024%205.39c8.59%200%2016.73-1.93%2024-5.39v-8a55.79%2055.79%200%200%201-24%205.39%2055.79%2055.79%200%200%201-24-5.39Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.1%22%2F%3E%3Cg%20transform%3D%22translate(0%20170)%22%3E%3Cpath%20d%3D%22M196%2038.63V110H68V38.63a71.52%2071.52%200%200%201%2026-8.94v44.3h76V29.69a71.52%2071.52%200%200%201%2026%208.94Z%22%20fill%3D%22%2365c9ff%22%2F%3E%3Cpath%20d%3D%22M86%2083a5%205%200%201%201-10%200%205%205%200%200%201%2010%200ZM188%2083a5%205%200%201%201-10%200%205%205%200%200%201%2010%200Z%22%20fill%3D%22%23F4F4F4%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(78%20134)%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M40%2015a14%2014%200%201%200%2028%200%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.7%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(104%20122)%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16%208c0%204.42%205.37%208%2012%208s12-3.58%2012-8%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.16%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(76%2090)%22%3E%3Cpath%20d%3D%22M44%2022a14%2014%200%201%201-28%200%2014%2014%200%200%201%2028%200ZM96%2022a14%2014%200%201%201-28%200%2014%2014%200%200%201%2028%200Z%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20d%3D%22M36%2022a6%206%200%201%201-12%200%206%206%200%200%201%2012%200ZM88%2022a6%206%200%201%201-12%200%206%206%200%200%201%2012%200Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.7%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(76%2082)%22%3E%3Cpath%20d%3D%22m22.77%201.58.9-.4C28.93-.91%2036.88-.03%2041.73%202.3c.57.27.18%201.15-.4%201.1-14.92-1.14-24.96%208.15-28.37%2014.45-.1.18-.41.2-.49.03-2.3-5.32%204.45-13.98%2010.3-16.3ZM87%2012.07c5.75.77%2014.74%205.8%2013.99%2011.6-.03.2-.31.26-.44.1-2.49-3.2-21.71-7.87-28.71-6.9-.64.1-1.07-.57-.63-.98%203.75-3.54%2010.62-4.52%2015.78-3.82Z%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.6%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(-1)%22%3E%3Cg%20fill%3D%22%23e8e1e1%22%3E%3Cpath%20d%3D%22M187.7%2056.12c.9%203.25%202.17%2011.95-.06%2014.84-.75.96-5.84-1.74-7.97-2.92l-3.53-1.96c-14.92-8.32-19.74-11-45.9-10.62-28.11.4-47.37%2013.58-48.46%2014.93-.75.93-1.71%203.44-2.5%2010.41-.25%202.2-.32%204.97-.4%207.71-.14%205.94-.3%2011.77-2.25%2011.76-2.44-.01-2.97-23.78-1.92-33.21.04-.36.1-.78.18-1.23.23-1.4.5-3.13.16-4.11-.16-.44-.54-.7-.94-.99-.62-.43-1.26-.88-1.08-2.03.21-1.31%201.1-1.43%201.97-1.56.57-.08%201.13-.16%201.5-.56%201.13-1.23.46-1.87-.31-2.6-.46-.43-.95-.9-1.12-1.53-.63-2.36%201.03-3.1%202.69-3.83l.38-.17c.69-.3%201.1-.42%201.42-.5.6-.15.85-.21%201.89-1.35-2.14-1.56-2.9-3.69.01-4.83.56-.22%201.52-.2%202.5-.2%201.2.02%202.4.03%202.94-.37.15-.11.24-.53.33-.9.06-.27.11-.5.18-.6%201.35-1.93%201.23-3.4%201.08-5.4l-.07-.92c-.13-2.04-.11-3.9%202.33-4.11%201-.08%201.9.4%202.77.86.54.29%201.08.58%201.64.73.87.23%201.1.43%201.32.43.19%200%20.37-.15.96-.55%201.18-.82%201.3-2.05%201.43-3.3.11-1.08.22-2.18%201.04-3%201.58-1.6%202.8-.64%204%20.3.64.5%201.28%201%201.96%201.1%202.55.36%203.06-1.06%203.62-2.59.36-1%20.74-2.06%201.74-2.68%201.83-1.15%202.64-.05%203.43%201.01.5.68.98%201.33%201.7%201.39%201.01.08%202.52-1.1%203.85-2.14a11.6%2011.6%200%200%201%202.1-1.44c2.27-.93%203.91.07%205.58%201.08%201.4.85%202.83%201.72%204.65%201.43l.83-.13c2.24-.37%203.11-.51%205.45.96a4.2%204.2%200%200%200%203.74.69c.6-.12%201.3-.25%202.26-.26%201.1%200%201.98.5%202.83.99.7.4%201.36.79%202.13.87.42.04.84-.16%201.26-.36.42-.2.84-.4%201.3-.38%201.83.11%202.69%201.5%203.55%202.88.67%201.08%201.34%202.15%202.46%202.66%201.62.72%203.44.24%205.17-.21.79-.2%201.55-.4%202.28-.5%203.96-.46%203.27%201.97%202.55%204.56a11.1%2011.1%200%200%200-.6%203.26c1.15.27%202.3-.15%203.46-.57%201.1-.4%202.18-.8%203.27-.6%203.4.58%202.25%204.02%201.44%206.45l-.08.21c.64%200%201.54-.2%202.56-.42%202.86-.6%206.61-1.41%207.78%201.13.47%201.05%200%202.31-.44%203.54a7.17%207.17%200%200%200-.61%202.41c.02%201.53.7%202.9%201.4%204.27.45.91.9%201.82%201.17%202.78Z%22%2F%3E%3Cpath%20d%3D%22m186.36%2073.6.47.33c1.76.99%203.15%2010.9%203.22%2014.69.04%202.34.08%2011.25-2.4%2010.48-.75-.23-1.9-4.95-2.06-7.72-.16-2.76-1.74-12.16-4.14-16.49-.13-.23-.32-.51-.53-.8-.65-.96-1.44-2.12-.92-2.76.72-.88%201.43-.57%202.26-.2l.44.18c.87.35%202.77%201.68%203.66%202.3Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(49%2072)%22%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(62%2042)%22%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E")',
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

      {/* AI Bot with tooltip centered over bot, arrow pointing to bot center */}
      <div className="fixed bottom-28 right-19 z-50 group">
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

        {/* Tooltip bubble centered over bot */}
        <div className="absolute bottom-[104px] left-1/4 -translate-x-1/2 hidden group-hover:block">
          <div className="relative bg-black text-white rounded-md shadow-lg px-4 py-2 max-w-[80vw] text-left">
            <div
              className="tw-typewriter tw-typewriter-run font-bold text-lg md:text-xl"
              style={{ display: "inline-block" }}
            >
              I am here to help you
            </div>
            {/* Arrow centered to bot */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black" />
          </div>
        </div>
      </div>

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
                  <LocationMap />
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
              <VoiceReport />

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
