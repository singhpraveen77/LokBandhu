import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";

const WelcomePage = () => {
  const [role, setRole] = useState("citizen");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login")
    console.log("Selected role:", role);
    // You can handle navigation or next step here
  };

  const handlecheck=async()=>{
    try {
      await login();
    } catch (error) {
      console.log("error in calling welcome page :",error);
      
    }
  }



  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white" style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
      <header className="bg-gray-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  clipRule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect fill="white" height="48" width="48" />
                </clipPath>
              </defs>
            </svg>
            <h1 className="text-xl font-bold tracking-tight">Lok Bandhu</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold tracking-tighter mb-2">Welcome</h2>
            <p className="text-lg text-gray-400">Please select your role to continue.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-8">
              {[
                { label: "Citizen", icon: "person", value: "citizen" },
                { label: "Official", icon: "corporate_fare", value: "official" },
                { label: "Moderator", icon: "shield", value: "moderator" },
              ].map((item) => (
                <label
                  key={item.value}
                  className={`group flex items-center p-5 rounded-xl border-2 border-gray-700 bg-gray-800 hover:border-green-400 transition-all duration-300 cursor-pointer ${
                    role === item.value ? "border-green-400 bg-gray-800/50" : ""
                  }`}
                >
                  <span
                    className={`material-symbols-outlined mr-4 ${
                      role === item.value ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-lg font-semibold">{item.label}</span>
                  <input
                    type="radio"
                    name="role"
                    value={item.value}
                    checked={role === item.value}
                    onChange={() => setRole(item.value)}
                    className="sr-only"
                  />
                  <span
                    className={`ml-auto w-6 h-6 border-2 border-gray-600 rounded-full flex items-center justify-center transition-all duration-300 ${
                      role === item.value ? "border-green-400" : ""
                    }`}
                  >
                    <span
                      className={`w-3 h-3 bg-green-400 rounded-full transition-transform duration-300 ${
                        role === item.value ? "scale-100" : "scale-0"
                      }`}
                    ></span>
                  </span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full py-4 px-6 bg-green-500 text-gray-900 font-bold text-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300"
            >
              <span>Continue</span>
              {/* <span className="material-symbols-outlined">arrow_forward</span> */}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
