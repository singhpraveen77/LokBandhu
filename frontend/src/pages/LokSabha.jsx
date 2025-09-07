

const LokSabha = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-3xl font-bold">Community Feed</h2>
          <div className="flex items-center gap-6">
            <a className="text-gray-300 hover:text-white transition-colors" href="#">
              Home
            </a>
            <a className="text-gray-300 hover:text-white transition-colors" href="#">
              Profile
            </a>
            <div
              className="bg-center bg-no-repeat aspect-square rounded-full border-2 border-gray-700 w-12 h-12"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1sYyvSscpHcw0ucNrsp5losT7a3RYJCnXkfGP_ethRlqEYvc12p4XAJwR8l1WQvoGu7AvMyQeDxFUp35qRhNjEUDvM2sWsvk_Z8Z2vsM9bMlaAngN6tst4h1tF3lC1AyOZLGO0RqCjkUSAg4wvCJ-zenWe6BrDQqqbDuvn86jLeiLggzmreuU1gin8pKIRMEvg2EBLU3eeGb_3VLThXIgDsvOyjBEs1JHO9zMqMNcom3gvz9m0_RFssJ0zMLRRl258qK6WUOMnqk")',
              }}
            ></div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              {
                author: "Jane Doe",
                location: "Springfield, USA",
                title: "Community Cleanup Drive",
                description:
                  "Join us this Saturday for a community cleanup drive at Central Park. Volunteers needed!",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCGjpbLdqfXAEeGtG-iDbPLD3rOc_CU4ENkSORPNKYHoGk7DaK3y6hzgW-6zx-jcRfXp6n3_IbCREYOS3VU44L5qzhxqUfEdI3ebdO9L2k0Ya6pwOQ7JtqLK3kqo3JGeQgYM6lhPvNGVeTIC2ndTSGjV5J1WbWq3hW_e1VayI3Q3pu6Esbd8Eb5Jmm_IaKSFkJWT-tb-7UZ1DGCo2iIuEEbXyPSsgMS9VxOsmrjzAptn7QcBrzf0UtycoBug3pK7OLez_CmNghKDyw",
                likes: 12,
                comments: 5,
                actionText: "View Details",
              },
              {
                author: "City Official",
                location: "Springfield, USA",
                title: "New Library Hours",
                description:
                  "The city library will now be open until 9 PM on weekdays. Come explore our new collection!",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBQgS8cEyhgjKcaF7vWSKbAwHroz_K6uNYHmppo4zuzd6i97Z39s6I8wI7JQ57ofa7gmmA11wVXNxp0uIIef5awjYLrKFITIUjmiXFDbeKfl5TG92i6c2BFk1pFZr3FQVc46vORO2xbf02ydpUdzAT-auGrYH6oeT9KEgIoprUmAa9m37QDexb0U-etkUaq8lqxVnJen9VKz2dBEh8fyYtcHBM-eDM_A5kPBitdjdZmxZ_cpa3XUImOw6XFiz7LIurRP0XPRpf4moU",
                likes: 28,
                comments: 11,
                actionText: "Learn More",
              },
              // Add other posts here...
            ].map((post, idx) => (
              <div key={idx} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
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
                      <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">thumb_up</span>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    <button className="bg-green-400 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition-colors">
                      {post.actionText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 bg-green-400 text-gray-900 p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};

export default LokSabha;
