import React from 'react'

const SideBar = () => {
  return (
    <div>
        {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-8">
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
          <h1 className="text-xl font-bold">CivicConnect</h1>
        </div>

        <nav className="flex flex-col gap-4">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
            Categories
          </h3>
          {[
            { icon: "newspaper", label: "Local News" },
            { icon: "event", label: "Community Events" },
            { icon: "security", label: "Public Safety" },
            { icon: "edit_road", label: "Infrastructure" },
            { icon: "park", label: "Environment" },
            { icon: "school", label: "Education" },
          ].map((item, idx) => (
            <a
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-gray-400">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

    </div>
  )
}

export default SideBar