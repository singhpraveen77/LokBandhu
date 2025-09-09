import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialProblems = [
  {
    id: 1024,
    description: "Potholes on Main Road",
    location: "Delhi, India",
    reporter: "Ravi Kumar",
    status: "Open",
    category: "Infrastructure",
  },
  {
    id: 1023,
    description: "Overflowing Garbage Bins",
    location: "Mumbai, India",
    reporter: "Neha Sharma",
    status: "Open",
    category: "Cleanliness",
  },
  {
    id: 1022,
    description: "Streetlights not working",
    location: "Lucknow, India",
    reporter: "Mohammed Ali",
    status: "Open",
    category: "Public Safety",
  },
  {
    id: 1021,
    description: "Tree Cutting in Park",
    location: "Chennai, India",
    reporter: "Priya Singh",
    status: "In Progress",
    category: "Environment",
  },
  {
    id: 1020,
    description: "Broken School Building",
    location: "Patna, India",
    reporter: "Ankit Verma",
    status: "Open",
    category: "Education",
  },
  {
    id: 1019,
    description: "Water Supply Problem",
    location: "Bhopal, India",
    reporter: "Sunita Devi",
    status: "Resolved",
    category: "Water & Drainage",
  },
  {
    id: 1018,
    description: "Traffic Signal Not Working",
    location: "Jaipur, India",
    reporter: "Rahul Mehta",
    status: "Open",
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

const Dashboard = () => {
  const navigate = useNavigate();

  const [problems, setProblems] = useState(initialProblems);
  const [filteredProblems, setFilteredProblems] = useState(initialProblems);
  const [activeCategory, setActiveCategory] = useState("All Issues");

  useEffect(() => {
    if (activeCategory === "All Issues") {
      setFilteredProblems(problems);
    } else {
      setFilteredProblems(
        problems.filter((p) => p.category === activeCategory)
      );
    }
  }, [activeCategory, problems]);

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
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
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-3xl font-bold">
            {activeCategory === "All Issues"
              ? "Problems Overview"
              : activeCategory}
          </h2>
          <div className="flex items-center gap-6">
            <a
              className="text-gray-300 hover:text-white transition-colors"
              href="#"
              onClick={() => navigate("/loksabha")}
            >
              Feed
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
            {/* Fixed Avatar */}
            <div
              className="bg-center bg-cover rounded-full border-2 border-gray-700 w-12 h-12"
              style={{
                backgroundImage:
                  'url("https://randomuser.me/api/portraits/men/32.jpg")',
              }}
            ></div>
          </div>
        </header>

        {/* Problems Table */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
                <tr>
                  <th className="px-6 py-3 text-left">Problem ID</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Location</th>
                  <th className="px-6 py-3 text-left">Reported By</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="border-b border-gray-700 hover:bg-gray-700 transition"
                    >
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
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      No problems in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
