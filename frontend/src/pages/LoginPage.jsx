import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    navigate("/loksabha")
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Handle login logic here
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white font-sans">
      <header className="border-b border-gray-700">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <svg
              className="h-8 w-8 text-green-400"
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
            <h1 className="text-xl font-bold">Lok Bandhu</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-sm font-medium text-gray-300 hover:text-white" href="#">
              About
            </a>
            <a className="text-sm font-medium text-gray-300 hover:text-white" href="#">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-gray-800 p-8 shadow-2xl">
          <div>
            <h2 className="text-center text-3xl font-bold tracking-tight text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Or{" "}
              <a
                className="font-medium text-green-400 hover:text-green-500"
                href="#"
              >
                create an account
              </a>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                  className="relative block w-full appearance-none rounded-lg border border-gray-600 bg-gray-700 px-3 py-4 text-white placeholder-gray-400 focus:z-10 focus:border-green-400 focus:outline-none focus:ring-green-400 sm:text-sm"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-lg border border-gray-600 bg-gray-700 px-3 py-4 text-white placeholder-gray-400 focus:z-10 focus:border-green-400 focus:outline-none focus:ring-green-400 sm:text-sm"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="role">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="relative block w-full appearance-none rounded-lg border border-gray-600 bg-gray-700 px-3 py-4 text-white placeholder-gray-400 focus:z-10 focus:border-green-400 focus:outline-none focus:ring-green-400 sm:text-sm"
                >
                  <option disabled value="">
                    Select Role
                  </option>
                  <option value="Citizen">Citizen</option>
                  <option value="Official">Official</option>
                  <option value="Moderator">Moderator</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-full border border-transparent bg-green-400 py-3 px-4 text-sm font-semibold text-gray-900 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
