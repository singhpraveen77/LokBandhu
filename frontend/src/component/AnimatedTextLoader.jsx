// AnimatedTextLoader.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnimatedTextLoader() {
  const baseText = "analysing your picture";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < baseText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + baseText[index]);
        setIndex(index + 1);
      }, 50); // typing speed (ms per character)
      return () => clearTimeout(timeout);
    }
  }, [index, baseText]);

  return (
    <motion.div
      className="font-medium text-gray-400 text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="inline-block w-2"
      >
        |
      </motion.span>
    </motion.div>
  );
}
