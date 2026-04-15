import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../locales/i18n";
import avatar from "../assets/avataaars-1757352915302.svg";
import { getAssignedIssues, getAdminDashboard } from "../api/adminApi";
import { updateIssueStatus, getIssues } from "../api/issueApi";
import { logout } from "../api/userApi";
import useUserStore from "../store/useUserStore";
import toast, { Toaster } from "react-hot-toast";

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
  const clearUser = useUserStore((state) => state.clearUser);
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("allIssues");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAllIssues, setShowAllIssues] = useState(false);
  const [stats, setStats] = useState({
    total_assigned: 0,
    in_progress: 0,
    resolved: 0,
    pending: 0,
  });

  const t = translations[language];

  useEffect(() => {
    if (showAllIssues) {
      fetchAllIssues();
    } else {
      fetchAssignedIssues();
    }
    fetchDashboardStats();
  }, [showAllIssues]);

  const fetchAssignedIssues = async () => {
    try {
      setLoading(true);
      const data = await getAssignedIssues();
      setProblems(data.results || []);
      setFilteredProblems(data.results || []);
    } catch (error) {
      console.error("Failed to fetch assigned issues:", error);
      toast.error("Failed to load assigned issues");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllIssues = async () => {
    try {
      setLoading(true);
      const data = await getIssues({ ordering: "-priority_score,-created_at" });
      setProblems(data.results || []);
      setFilteredProblems(data.results || []);
    } catch (error) {
      console.error("Failed to fetch all issues:", error);
      toast.error("Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const data = await getAdminDashboard();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  const handleStatusUpdate = async (issueId, newStatus) => {
    try {
      await updateIssueStatus(issueId, newStatus);
      toast.success("Status updated successfully!");
      fetchAssignedIssues();
      fetchDashboardStats();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    logout();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (activeCategory === "allIssues") {
      setFilteredProblems(problems);
    } else {
      // Filter by status
      const statusMap = {
        infrastructure: "ASSIGNED",
        cleanliness: "IN_PROGRESS",
        publicSafety: "RESOLVED",
      };
      
      const status = statusMap[activeCategory];
      if (status) {
        setFilteredProblems(problems.filter((p) => p.status === status));
      } else {
        setFilteredProblems(problems);
      }
    }
  }, [activeCategory, problems]);

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
                  onClick={handleLogout}
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
            {/* Toggle and Stats */}
            <div className="mb-6">
              {/* Toggle Button */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAllIssues(false)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      !showAllIssues
                        ? "bg-green-400 text-gray-900"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    My Assigned Issues
                  </button>
                  <button
                    onClick={() => setShowAllIssues(true)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      showAllIssues
                        ? "bg-green-400 text-gray-900"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    All Issues
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Assigned</p>
                  <p className="text-2xl font-bold">{stats.total_assigned}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.in_progress}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Resolved</p>
                  <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-red-400">{stats.pending}</p>
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
                  <tr>
                    <th className="px-6 py-3 text-left">ID</th>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Reporter</th>
                    <th className="px-6 py-3 text-left">Department</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-gray-400">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredProblems.length > 0 ? (
                    filteredProblems.map((problem) => (
                      <tr key={problem.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                        <td className="px-6 py-4">#{problem.id}</td>
                        <td className="px-6 py-4 max-w-xs truncate">{problem.title || problem.description.substring(0, 40)}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            {problem.issue_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">{problem.address || "N/A"}</td>
                        <td className="px-6 py-4">{problem.created_by_name}</td>
                        <td className="px-6 py-4">{problem.department_name || "Unassigned"}</td>
                        <td className="px-6 py-4">
                          <select
                            value={problem.status}
                            onChange={(e) => handleStatusUpdate(problem.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold bg-gray-700 border-none cursor-pointer ${
                              problem.status === "RESOLVED"
                                ? "text-green-400"
                                : problem.status === "IN_PROGRESS"
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            <option value="REPORTED">Reported</option>
                            <option value="ASSIGNED">Assigned</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="ESCALATED">Escalated</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-bold">
                            {problem.priority_score}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <span className="material-symbols-outlined text-6xl text-gray-600">
                            {showAllIssues ? "search_off" : "assignment"}
                          </span>
                          <p className="text-gray-400 text-lg">
                            {showAllIssues ? "No issues found in the system" : "No issues assigned to you yet"}
                          </p>
                          {!showAllIssues && (
                            <p className="text-gray-500 text-sm max-w-md">
                              Issues will appear here when citizens report problems in your department. 
                              Click "All Issues" to see all issues in the system.
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
              ) : filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <div key={problem.id} className="bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-gray-400">#{problem.id}</p>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-bold">
                        Priority: {problem.priority_score}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{problem.title || problem.description.substring(0, 50)}</h3>
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        {problem.issue_type}
                      </span>
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        {problem.department_name || "Unassigned"}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-1">{problem.address || "N/A"}</p>
                    <p className="text-gray-400 text-sm mb-3">Reporter: {problem.created_by_name}</p>
                    <select
                      value={problem.status}
                      onChange={(e) => handleStatusUpdate(problem.id, e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-semibold bg-gray-700 border-none ${
                        problem.status === "RESOLVED"
                          ? "text-green-400"
                          : problem.status === "IN_PROGRESS"
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      <option value="REPORTED">Reported</option>
                      <option value="ASSIGNED">Assigned</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="ESCALATED">Escalated</option>
                    </select>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="material-symbols-outlined text-6xl text-gray-600">
                      {showAllIssues ? "search_off" : "assignment"}
                    </span>
                    <p className="text-gray-400 text-lg">
                      {showAllIssues ? "No issues found in the system" : "No issues assigned to you yet"}
                    </p>
                    {!showAllIssues && (
                      <p className="text-gray-500 text-sm max-w-md px-4">
                        Issues will appear here when citizens report problems in your department. 
                        Click "All Issues" to see all issues in the system.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
