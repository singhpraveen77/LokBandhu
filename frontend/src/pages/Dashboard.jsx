import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../locales/i18n";
import avatar from "../assets/avataaars-1757352915302.svg";

const initialProblems = [
  { id: 1024, description: "Potholes on Main Road", location: "Delhi, India", reporter: "Ravi Kumar", status: "Open", category: "Infrastructure" },
  { id: 1023, description: "Overflowing Garbage Bins", location: "Mumbai, India", reporter: "Neha Sharma", status: "Open", category: "Cleanliness" },
  { id: 1022, description: "Streetlights not working", location: "Lucknow, India", reporter: "Mohammed Ali", status: "Open", category: "Public Safety" },
  { id: 1021, description: "Tree Cutting in Park", location: "Chennai, India", reporter: "Priya Singh", status: "In Progress", category: "Environment" },
  { id: 1020, description: "Broken School Building", location: "Patna, India", reporter: "Ankit Verma", status: "Open", category: "Education" },
  { id: 1019, description: "Water Supply Problem", location: "Bhopal, India", reporter: "Sunita Devi", status: "Resolved", category: "Water & Drainage" },
  { id: 1018, description: "Traffic Signal Not Working", location: "Jaipur, India", reporter: "Rahul Mehta", status: "Open", category: "Traffic" },
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState(initialProblems);
  const [filteredProblems, setFilteredProblems] = useState(initialProblems);
  const [activeCategory, setActiveCategory] = useState("allIssues");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const t = translations[language];

  useEffect(() => {
    if (activeCategory === "allIssues") {
      setFilteredProblems(problems);
    } else {
      setFilteredProblems(problems.filter(p => p.category === t.categories[activeCategory]));
    }
  }, [activeCategory, problems, t]);

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a]">
      <div className="flex h-screen text-white font-sans overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 w-64 bg-gray-800 p-6 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-20 lg:translate-x-0 flex flex-col`}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-green-400 text-3xl">diversity_3</span>
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
              {t.categories.allIssues === "All Issues" ? "Categories" : "श्रेणियाँ"}
            </h3>
            {categories.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveCategory(item.key);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeCategory === item.key ? "bg-green-500 text-gray-900" : "hover:bg-gray-700"
                }`}
              >
                <span className="material-symbols-outlined text-gray-300">{item.icon}</span>
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
                {activeCategory === "allIssues" ? t.header.problemsOverview : t.categories[activeCategory]}
              </h2>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-wrap justify-end flex-1">
              {/* Desktop Nav */}
              <div className="hidden sm:flex gap-4">
                <button className="text-gray-300 hover:text-white" onClick={() => navigate("/analysis")}>
                  {t.header.analysis}
                </button>
                <button className="text-gray-300 hover:text-white" onClick={() => navigate("/loksabha")}>
                  {t.header.feed}
                </button>
                <button className="text-gray-300 hover:text-white" onClick={() => navigate("/profile")}>
                  {t.header.profile}
                </button>
                <button
                  className="text-gray-300 hover:text-white"
                  onClick={() => navigate("/")}
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
                  {t.header.analysis}
                  <span className="ml-1">▾</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg z-30">
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/analysis"); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      {t.header.analysis}
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/loksabha"); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      {t.header.feed}
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/profile"); }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      {t.header.profile}
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/"); }}
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

          {/* Problems List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
                  <tr>
                    <th className="px-6 py-3 text-left">{t.table.problemID}</th>
                    <th className="px-6 py-3 text-left">{t.table.description}</th>
                    <th className="px-6 py-3 text-left">{t.table.location}</th>
                    <th className="px-6 py-3 text-left">{t.table.reportedBy}</th>
                    <th className="px-6 py-3 text-left">{t.table.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems.length > 0 ? (
                    filteredProblems.map((problem) => (
                      <tr key={problem.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                        <td className="px-6 py-4">{problem.id}</td>
                        <td className="px-6 py-4">{problem.description}</td>
                        <td className="px-6 py-4">{problem.location}</td>
                        <td className="px-6 py-4">{problem.reporter}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              problem.status === "Open"
                                ? "bg-green-500 text-gray-900"
                                : problem.status === "In Progress"
                                ? "bg-yellow-500 text-gray-900"
                                : "bg-red-500 text-white"
                            }`}
                          >
                            {problem.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                        {t.table.noProblems}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <div key={problem.id} className="bg-gray-800 p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-400">{t.table.problemID}: {problem.id}</p>
                    <h3 className="text-lg font-bold">{problem.description}</h3>
                    <p className="text-gray-300">{problem.location}</p>
                    <p className="text-gray-400">{t.table.reportedBy}: {problem.reporter}</p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        problem.status === "Open"
                          ? "bg-green-500 text-gray-900"
                          : problem.status === "In Progress"
                          ? "bg-yellow-500 text-gray-900"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {problem.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">{t.table.noProblems}</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
