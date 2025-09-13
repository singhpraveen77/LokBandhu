import { useState } from "react";

const mockProblems = [
  { id: 1, title: "Potholes on Main Road", status: "Pending - Assigned to Municipal Staff" },
  { id: 2, title: "Overflowing Garbage Bins", status: "Resolved - Garbage collected yesterday" },
  { id: 3, title: "Broken Streetlight", status: "In Progress - Repair scheduled tomorrow" },
];

export default function AIBot({ t }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

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

  return (
    <div className="fixed bottom-28 right-20 z-50 group">
      {/* Bot Button */}
      <button
        type="button"
        aria-label="AI assistant"
        onClick={() => setOpen(!open)}
        className="shadow-none focus:outline-none bg-transparent"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt="AI bot"
          className="w-20 h-20 transition-transform duration-200 hover:scale-105"
        />
      </button>


  {/* Tooltip on Hover */}
      <div className="absolute bottom-[104px] left-1/4 -translate-x-1/2 hidden group-hover:block">
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
      
      {/* Chat Dialog */}
      {open && (
        <div
          className="absolute bottom-[104px] right-0 bg-white text-black rounded-2xl shadow-2xl w-80 h-96 flex flex-col animate-fadeIn"
        >
          {/* Header */}
          <div className="bg-green-500 text-white p-3 rounded-t-2xl font-bold flex justify-between items-center">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200 text-lg">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 max-w-[80%] rounded-lg ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-gray-800 mr-auto"
                }`}
              >
                {msg.text.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me something..."
              className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 text-white px-4 rounded-full hover:bg-green-600 transition"
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

