import React, { useState, useEffect } from "react";
import "./App.css";

const emojis = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🤎", "🩷", "🩵", "💕"];

const App = () => {
  const [emojiList, setEmojiList] = useState([]);
  let lastGeneratedTime = 0;

  useEffect(() => {
    document.title = "Floating Hearts Animation"; // Set title dynamically

    const handleMouseMove = (e) => {
      const now = Date.now();

      // Generate emoji every 50ms (20 per second)
      if (now - lastGeneratedTime > 50) {
        lastGeneratedTime = now;

        const newEmoji = {
          id: Date.now() + Math.random(),
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: e.clientX,
          y: e.clientY,
        };

        setEmojiList((prev) => [...prev, newEmoji]);

        // Remove emoji after it fully reaches the top (matches animation time)
        setTimeout(() => {
          setEmojiList((prev) => prev.filter((item) => item.id !== newEmoji.id));
        }, 5000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="emoji-container">
      {emojiList.map((emoji) => (
        <span
          key={emoji.id}
          className="emoji"
          style={{ left: emoji.x, top: emoji.y }}
        >
          {emoji.emoji}
        </span>
      ))}
    </div>
  );
};

export default App;
