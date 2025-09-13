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
  const messagesEndRef = useRef(null); // for auto-scroll

  const handleSend = () => {
    if (!input.trim()) return;
    const query = input.toLowerCase();
    let response = "";

    if (["issues", "my issues", "my issue", "issue"].some(word => query.includes(word))) {
      response = mockProblems.map(p => `• ${p.title}`).join("\n");
    } else if (["status", "i want to see status"].some(word => query.includes(word))) {
      response = mockProblems.map(p => `• ${p.title}: ${p.status}`).join("\n");
    } else {
      response = "❓ Sorry, I didn’t understand. Try asking about issues or status.";
    }

    setMessages([...messages, { type: "user", text: input }, { type: "bot", text: response }]);
    setInput("");
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
          <div className="relative bg-black text-white rounded-md shadow-lg px-4 py-2 max-w-[80vw] text-left">
            <div
              className="tw-typewriter tw-typewriter-run font-bold text-lg md:text-xl"
              style={{ display: "inline-block" }}
            >
              {t?.posts?.helpText || "Hi! 👋 Click me to chat with me."}
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full h-0 w-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-black" />
          </div>
        </div>
      )}

      {/* Chat Dialog */}
      {open && (
        <div
          className="absolute bottom-[104px] right-0 bg-slate-900 text-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col animate-fadeIn border border-slate-700"
        >
          {/* Header */}
          <div className="bg-green-500 text-white p-3 rounded-t-2xl font-bold flex justify-between items-center">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-lg">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-base flex flex-col">
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
                      ? "bg-green-600 text-white self-end ml-auto"
                      : "bg-slate-800 text-gray-200 mr-auto"
                  }`}
                >
                  {msg.text.split("\n").map((line, idx) => (
                    <div key={idx} className="mb-2 last:mb-0">
                      {line}
                    </div>
                  ))}
                </div>
              ))
            )}
            {/* Dummy div to scroll into view */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-700 flex gap-2 bg-slate-900">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me something..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 text-white px-5 rounded-full hover:bg-green-600 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
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
      `}</style>
    </div>
  );
}
