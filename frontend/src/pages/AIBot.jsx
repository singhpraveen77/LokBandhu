import { useState, useEffect, useRef } from "react";

const mockProblems = [
  { id: 1, title: "Potholes on Main Road", status: "Pending - Assigned to Municipal Staff" },
  { id: 2, title: "Overflowing Garbage Bins", status: "Resolved - Garbage collected yesterday" },
  { id: 3, title: "Broken Streetlight", status: "In Progress - Repair scheduled tomorrow" },
];

export default function AIBot({ t }) {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const issueKeywords = [
    "issues", "my issues", "my issue", "issue",
    "problems", "problem", "complaints", "complaint",
    "tickets", "reports", "report", "show issues",
    "list problems", "show my complaints"
  ];

  const statusKeywords = [
    "status", "i want to see status", "progress", "check progress",
    "update", "updates", "situation", "current status",
    "how is it going", "work status", "issue status", "problem status"
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const query = input.toLowerCase();
      let response = "";

      // Special case: "how to post"
      if (query.includes("how to post")) {
        setIsLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // 🔗 replace with your tutorial link
          },
        ]);
        return;
      }

      if (issueKeywords.some(word => query.includes(word))) {
        response = mockProblems.map(p => `• ${p.title}`).join("\n");
      } else if (statusKeywords.some(word => query.includes(word))) {
        response = mockProblems.map(p => `• ${p.title}: ${p.status}`).join("\n");
      } else {
        response = "❓ Sorry, I didn’t understand. Try asking about issues, status, or how to post.";
      }

      // Stop loading dots, start typing effect
      setIsLoading(false);

      // Add empty bot message first
      setMessages((prev) => [...prev, { type: "bot", text: "" }]);

      let i = 0;
      const typingInterval = setInterval(() => {
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = {
            ...lastMsg,
            text: lastMsg.text + response[i],
          };
          return newMsgs;
        });

        i++;
        if (i >= response.length) {
          clearInterval(typingInterval);
        }
      }, 10);
    }, 800);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="fixed bottom-28 right-20 z-50">
      {/* Bot Button */}
      <button
        type="button"
        aria-label="AI assistant"
        onClick={() => {
          setOpen(!open);
          setShowTooltip(false);
        }}
        onMouseEnter={() => !open && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="shadow-none focus:outline-none bg-transparent"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="AI bot"
          className="w-20 h-20 transition-transform duration-200 hover:scale-105"
        />
      </button>

      {/* Tooltip */}
      {showTooltip && !open && (
        <div className="absolute bottom-[104px] left-1/4 -translate-x-1/2">
          <div className="relative bg-gray-900 text-purple-300 rounded-md shadow-lg px-4 py-2 max-w-[80vw] text-left border border-purple-500/50">
            <div
              className="tw-typewriter tw-typewriter-run font-bold text-lg md:text-xl"
              style={{ display: "inline-block" }}
            >
              {t?.posts?.helpText || "Hi! 👋 Click me to chat with me."}
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-gray-900" />
          </div>
        </div>
      )}

      {/* Chat Dialog */}
      {open && (
        <div
          className="absolute bottom-[104px] right-0 bg-gray-950 text-purple-100 rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col animate-fadeIn border border-purple-700/60"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-t-2xl font-bold flex justify-between items-center">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-lg">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-base flex flex-col custom-scrollbar">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center m-auto">
                💡 Ask me your doubt!
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 max-w-[85%] rounded-lg leading-relaxed ${
                    msg.type === "user"
                      ? "bg-purple-600 text-white self-end ml-auto"
                      : "bg-gray-800 text-purple-200 mr-auto"
                  }`}
                >
                  {msg.video ? (
                                      <a
                    href={msg.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-72 rounded-lg overflow-hidden shadow-lg border border-purple-600/50 bg-gray-900 hover:scale-[1.02] transition-transform"
                  >
                    {/* Thumbnail */}
                    <div className="relative">
                      <img
                        src={`https://img.youtube.com/vi/${
                          msg.video.split("v=")[1]?.split("&")[0] || "dQw4w9WgXcQ"
                        }/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-40 object-cover rounded-t-lg"   // only top corners rounded
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            className="w-7 h-7 ml-1"
                          >
                            <path d="M3 22v-20l18 10-18 10z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-3 rounded-b-lg border-t border-purple-600/50 bg-gray-950">
                      <h3 className="font-semibold text-purple-100">📹 How to Post</h3>
                      <p className="text-sm text-purple-400">Click to watch tutorial on YouTube</p>
                    </div>
                  </a>

                  ) : (
                    msg.text?.split("\n").map((line, idx) => (
                      <div key={idx} className="mb-2 last:mb-0">
                        {line}
                      </div>
                    ))
                  )}
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="bg-gray-800 text-purple-300 mr-auto p-2 rounded-lg flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-purple-700/60 flex gap-2 bg-gray-950">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me something..."
              className="flex-1 bg-gray-900 border border-purple-700/50 rounded-full px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-100 placeholder-purple-400/60"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white px-5 rounded-full hover:bg-purple-700 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Animations + Scrollbar */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInUp 0.3s ease-in-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111827; /* gray-900 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #8b5cf6; /* purple-500 */
          border-radius: 10px;
          border: 2px solid #111827;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #7c3aed; /* purple-600 */
        }
      `}</style>
    </div>
  );
}
